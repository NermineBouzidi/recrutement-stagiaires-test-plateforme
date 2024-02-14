import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../models/Users';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  userForm: FormGroup;
  constructor(private http: AuthService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstname: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      linkedinUrl: new FormControl('', [Validators.required]),
      number: new FormControl('', [ Validators.required,Validators.minLength(8),]),
      educationLevel: new FormControl('', [Validators.required]),
     // password: new FormControl('', [Validators.required]),
    });
  }

  isSubmitted: boolean = false;
  userExist: boolean = false;
  Register() {
    this.isSubmitted = true;
    if (this.userForm.valid) {
      const user: UserDTO = {
        firstname: this.userForm.get('firstname').value,
        lastName: this.userForm.get('lastName').value, // Corrected property name
        email: this.userForm.get('email').value,
        linkedinUrl: this.userForm.get('linkedinUrl').value,
        number: this.userForm.get('number').value,
        educationLevel: this.userForm.get('educationLevel').value,
        //password: this.userForm.get('password').value
      };
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
  linkedinUrl:String;
  number :String;
  educationLevel:String;
  //password:String;
}