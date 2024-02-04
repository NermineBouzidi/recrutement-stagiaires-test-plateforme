import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpHeaders, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-registration-form-component',
  standalone: true,
  imports: [FormsModule,HttpClientModule],
  templateUrl: './registration-form-component.component.html',
  styleUrl: './registration-form-component.component.css'
})
export class RegistrationFormComponentComponent {
  userObj :user;
   constructor (private http :HttpClient){
    this.userObj=new user;
   }
   onRegister() {
    this.http.post("http://localhost:8080/api/auth/register", this.userObj, { observe: 'response' }).subscribe(
      (response: HttpResponse<any>) => {
        if (response.body && response.body == "Registration successful") {
          alert("Registration successful");
          // Redirect to a new page or perform any other actions after successful registration
        } else {
          alert("Registration failed");
        }
      },
      (error) => {
        console.error("Error during registration:", error);
        alert("Registration failed");
      }
    );
  }
  
}
  export class user {
    firstname:String ;
    lastName:String ;
     email:String;
     number :number;
    educationLevel:String;
    constructor(){
      this.firstname="";
      this.lastName="";
     this.email="";
     this.number=0;
     this.educationLevel="";
    }
  }


