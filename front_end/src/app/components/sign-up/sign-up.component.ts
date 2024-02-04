import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  loginObj :login;
  constructor (private http : HttpClient, private router:Router){
    this.loginObj=new login;
  }

  onLogin() {
    this.http.post("http://localhost:8080/api/user/loginAdmin", this.loginObj, { responseType: 'text' }).subscribe((res: any) => {
      if (res.includes("Login successful")) {
        alert("Login successful");
        this.router.navigateByUrl("/dashboard");
      } else {
        alert("Login failed");
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
