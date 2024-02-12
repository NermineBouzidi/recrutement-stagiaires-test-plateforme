import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  userObj!:any
  userForm:FormGroup;
  constructor( private fb: FormBuilder) {
    this.userForm =this.fb.group(
      {firstname:new FormControl("",[Validators.required]),
      lastName:new FormControl("",[Validators.required]),
        email: new FormControl("",[Validators.required,Validators.email]),
      number: new FormControl("",[Validators.required ,Validators.minLength(8)]),
      educationLevel:new FormControl("",[Validators.required]),
      password:new FormControl("",[Validators.required])
    }) 
  }
 
  
  
  isSubmitted: boolean = false;
  userExist: boolean = false;
  Register(){
  this.isSubmitted=true;
  }
}
