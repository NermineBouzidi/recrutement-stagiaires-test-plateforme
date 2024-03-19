import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup,FormControl,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { ToastrService } from '../shared/services/toastr.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
 loginObj : login;
 isSubmitted :boolean=false;
 userForm :FormGroup;
 errorMessage: string;
 alertMessage: string = 'Login successful.';
 rememberMe = false;
  constructor (private http : AuthService, private router:Router,private fb: FormBuilder , private toastr : ToastrService){
    this.loginObj=new login;
    this.userForm  =this.fb.group(
      {password:new FormControl("",[Validators.required]),
        email: new FormControl("",[Validators.required,Validators.email])
    })
  }

 // Add this method to your component class
togglePasswordVisibility(inputId: string): void {
  const input = document.getElementById(inputId) as HTMLInputElement;
  input.type = input.type === 'password' ? 'text' : 'password';
}
  Login() {
    this.isSubmitted=true;
    this.loginObj.email= this.userForm.value.email;
    this.loginObj.password= this.userForm.value.password;
    if (this.userForm.valid){
    this.http.login(this.userForm.value.email, this.userForm.value.password,this.rememberMe).subscribe((res: any) => {
      if (res.role=='ROLE_USER') {
        this.toastr.showToas("login successfull")
        this.router.navigateByUrl("/user");
      } else {
        if  (res.role=='ROLE_ADMIN') {
          this.toastr.showToas("login successfull")
          this.router.navigateByUrl("/dashboard");

    }}
    },
    (error: HttpErrorResponse) => {
     if (error.status === 401) {
        this.errorMessage = "Invalid credentials";
      } else {
        this.errorMessage = "Login failed";
      }
      console.error("Login error:", error);
      
    })
  }  
}
toggleRememberMe() {
  this.rememberMe = !this.rememberMe;
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
