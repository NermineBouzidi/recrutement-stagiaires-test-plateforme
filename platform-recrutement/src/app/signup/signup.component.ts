import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  userObj!:any
  userForm:any={};
  isSubmitted: boolean = false;
  userExist: boolean = false;
}
