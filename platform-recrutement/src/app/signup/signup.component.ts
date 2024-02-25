import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../models/Users';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  userForm: FormGroup;
  isSubmitted: boolean = false;
  userExist: boolean = false;
  selectedFile: File;

  
  constructor(private http: AuthService, private fb: FormBuilder,private h :HttpClient) {
    this.userForm = this.fb.group({
      firstname: new FormControl('', [Validators.required ,Validators.pattern(/^[a-zA-Z ]+$/)]),
      lastName: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z ]+$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      linkedinUrl: new FormControl('', [Validators.required]),
      number: new FormControl('', [ Validators.required,Validators.minLength(8),Validators.maxLength(8)]),
      educationLevel: new FormControl('', [Validators.required]),
      resume : new FormControl(''),
  
    });

  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
 /*   const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.h.post("http://localhost:8080/api/auth/addFile",formData).subscribe((res: any)=>{
      console.log(res)
    })*/
  }
  formatNumber(input: string): string {
    const numericValue = input.replace(/\D/g, '');
    if (numericValue.length > 0) {
      const formattedValue = numericValue.match(/(\d{1,2})(\d{1,3})(\d{1,3})/);
      return formattedValue.slice(1).join(' ');
    } else {
      return '';
    }
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.userForm.controls['resume'].setValue(file.name); // Set filename for display
    }
  }
  
  /*Register(){
    const formData = new FormData();
    const user: UserDTO = {
      firstname: this.userForm.get('firstname').value,
      lastName: this.userForm.get('lastName').value, // Corrected property name
      email: this.userForm.get('email').value,
      number: this.formatNumber(this.userForm.get('number').value) ,
      educationLevel: this.userForm.get('educationLevel').value,
      linkedinUrl: this.userForm.get('linkedinUrl').value,
    };
    formData.append('user', JSON.stringify(user));
        formData.append('file', this.selectedFile);
        console.log(JSON.stringify(user));
    this.h.post("http://localhost:8080/api/auth/signup",formData).subscribe((res: any)=>{
      console.log(res)
    })
  }*/
 
  Register() {
    this.isSubmitted = true;
    
   if (this.userForm.valid) {
      const user: UserDTO = {
        firstname: this.userForm.get('firstname').value,
        lastName: this.userForm.get('lastName').value, // Corrected property name
        email: this.userForm.get('email').value,
        linkedinUrl: this.userForm.get('linkedinUrl').value,
        number: this.formatNumber(this.userForm.get('number').value) ,
        educationLevel: this.userForm.get('educationLevel').value,
      };
    //  const file :File =this.userForm.get('resume').value;
      this.http.register(user).subscribe(
        (response: HttpResponse<any>) => {
          console.log('Response:', response); // Log the entire response for debugging

          if (
            response.body &&
            response.body.includes("Registration successful")
          ) {
            alert('Registration successful');
            // Redirect to a new page or perform any other actions after successful registration
          } else {
            alert('login failed');
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Error:', error);

          if (error.status === 400 && error.error === "user already exists ") {
            this.userExist = true;
            //alert("user already exists wi");
          } else {
            console.log(error);
            alert('An error occurred during registration');
          }
        }
      );
    } 
  }
}
export class UserDTO {
  firstname:String ;
  lastName:String ;
  email:String;
  number :String;
  educationLevel:String;
  linkedinUrl:String;

}