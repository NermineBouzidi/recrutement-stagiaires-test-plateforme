import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient ,HttpErrorResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormGroup,FormControl,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, HttpClientModule,NavbarComponent,ReactiveFormsModule,],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  loginObj :login;
  constructor (private http : HttpClient, private router:Router,private fb: FormBuilder){
    this.loginObj=new login;
  }
  userForm :FormGroup =this.fb.group(
    {password:new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.required,Validators.email])
  })
  onLogin() {
    this.http.post("http://localhost:8080/api/auth/login", this.loginObj, { responseType: 'text' }).subscribe((res: any) => {
      if (res.includes("login successfful")) {
        alert("login successful");
        this.router.navigateByUrl("/test");
      } else {
        alert("Login failed");
      }
    },(error: HttpErrorResponse) => {
      console.error("Error:", error);

      if (error.status === 403 ) {
        alert("Login failed");
      } else {
        alert("An error occurred during registration");
      }
    });
  }
  
  



}
 export class login {
       email :String;
       password:String ;
       constructor(){
        this.email="";
        this.password="";
       }
 }
