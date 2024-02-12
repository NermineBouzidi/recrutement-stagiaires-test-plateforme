import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup,FormControl,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
 loginObj : login;
 isSubmitted =false;
 userForm :FormGroup;

  constructor (private http : AuthService, private router:Router,private fb: FormBuilder){
    this.loginObj=new login;
    this.userForm  =this.fb.group(
      {password:new FormControl("",[Validators.required]),
        email: new FormControl("",[Validators.required,Validators.email])
    })
  }
 
  Login() {
    this.isSubmitted=true;
    this.loginObj.email= this.userForm.value.email;
    this.loginObj.password= this.userForm.value.password;
    this.http.login(this.userForm.value.email, this.userForm.value.password).subscribe((res: any) => {
      if (res.role=='ROLE_USER') {
        alert("login successful");
        this.router.navigateByUrl("/register");
      } else {
        if  (res.role=='ROLE_ADMIN') {
          alert("login successful");
          this.router.navigateByUrl("/dashboard");
        } else {
        alert("Login failed");
      }
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
