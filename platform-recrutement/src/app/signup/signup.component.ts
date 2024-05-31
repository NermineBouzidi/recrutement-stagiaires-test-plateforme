import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/Users';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ToastrService } from '../shared/services/toastr.service';


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

  
  constructor(private http: AuthService, private fb: FormBuilder, private toastr : ToastrService) {
    this.userForm = this.fb.group({
      firstname: new FormControl('', [Validators.required ,Validators.pattern(/^[a-zA-Z ]+$/)]),
      lastName: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z ]+$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      linkedinUrl: new FormControl('', [Validators.required]),
      number: new FormControl('', [ Validators.required,Validators.minLength(8),Validators.maxLength(8)]),
      educationLevel: new FormControl('', [Validators.required]),
      specializations: new FormControl('',[Validators.required]),
      resume : new FormControl(''),
  
    });

  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

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
  
  
  
 
  Register() {
    this.isSubmitted = true;
    
   if (this.userForm.valid) {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('firstname', this.userForm.get('firstname').value);
    formData.append('lastName', this.userForm.get('lastName').value);
    formData.append('email', this.userForm.get('email').value);
    formData.append('number', this.formatNumber(this.userForm.get('number').value));
    formData.append('educationLevel', this.userForm.get('educationLevel').value);
    formData.append('linkedinUrl', this.userForm.get('linkedinUrl').value); 
    formData.append('specializations', this.userForm.get('specializations').value);       
      this.http.signup(formData).subscribe((res: any) => {

          if (  res.body &&  res.body.includes("Registration successful")) {
            this.toastr.showToas("login successfull")
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

export interface UserDTO {
  firstname:String ;
  lastName:String ;
  email:String;
  number :String;
  educationLevel:String;
  linkedinUrl:String;

}