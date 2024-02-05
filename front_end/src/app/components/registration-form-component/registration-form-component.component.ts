import { Component } from '@angular/core';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpHeaders, HttpResponse,HttpErrorResponse } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder ,ReactiveFormsModule,FormGroup } from '@angular/forms';


@Component({
  selector: 'app-registration-form-component',
  standalone: true,
  imports: [FormsModule,HttpClientModule,NavbarComponent,ReactiveFormsModule],
  templateUrl: './registration-form-component.component.html',
  styleUrl: './registration-form-component.component.css'
})
export class RegistrationFormComponentComponent {
 userObj :user;
  constructor( private http: HttpClient,private fb: FormBuilder) {
  this.userObj= new user();
    };
    
    userForm :FormGroup =this.fb.group(
      {firstname:new FormControl("",[Validators.required]),
      lastName:new FormControl("",[Validators.required]),
        email: new FormControl("",[Validators.required,Validators.email]),
      number: new FormControl("",[Validators.required ,Validators.minLength(8)]),
      educationLevel:new FormControl("",[Validators.required]),
      password:new FormControl("",[Validators.required])
    })
    isSubmitted =false;
 
  

   onRegister() {
    this.isSubmitted=true;
    if (this.userForm.valid){
    this.http.post("http://localhost:8080/api/auth/register", this.userObj, { observe: 'response' ,responseType: 'text'}).subscribe(
      (response: HttpResponse<any>) => {
        console.log("Response:", response); // Log the entire response for debugging
  
        if (response.body && response.body.includes("Registration successful")) {
          alert("Registration successful");
          // Redirect to a new page or perform any other actions after successful registration
        } else {
          alert("login failed");
        }
      },
      (error: HttpErrorResponse) => {
        console.error("Error:", error);
  
        if (error.status === 400 && error.error === "user already exists ") {
          alert("user already exists");
        } else {
          alert("An error occurred during registration");
        }
      }
      
    ) }
      
  
}
}
  export class user {
    firstname:String ;
    lastName:String ;
     email:String;
     number :String;
    educationLevel:String;
    password:String
    constructor(){
      this.firstname="";
      this.lastName="";
     this.email="";
     this.number="";
     this.educationLevel="";
     this.password=""
    }
  }


