import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/Users';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AdminService } from '../shared/services/admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user :User;
  editMode = false;
  editModePassword = false;
  profileForm: FormGroup;
  passwordForm :FormGroup;
  passwordChangeError:string;

  constructor(private http :AdminService, private fb: FormBuilder, private Http :AuthService){
    this.profileForm = this.fb.group({
      firstname: [''],
      lastName: [''],
      email: ['', [Validators.email]]
    });
    this.passwordForm =this.fb.group({
      currentPassword: [''],
      newPassword: [''],
      confirmPassword: ['']
    });
   this.getProfile()
  }
 

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }
  toggleEditPasswordMode(): void {
    this.editModePassword = !this.editModePassword;
  }
  getProfile(){
    const token = this.Http.getToken();
    this.http.getUserProfileFromToken(token).subscribe((data:any)=>{
      this.user=data;
      this.profileForm.patchValue(this.user);
      })

  }
  updateProfile(profileForm){
    if (profileForm.valid){
      const user1 :User =profileForm.value;
    
    this.http.updateUser(this.user.id,user1).subscribe(
      (response: HttpResponse<any>) => {
      console.log("Response:", response); // Log the entire response for debugging
      if (response.body && response.body.includes("user updated successfully")) {
        this.getProfile();
        this.toggleEditMode();
        // Redirect to a new page or perform any other actions after successful registration
      } else {
        alert("failed");
      }
    })
  }
}
updatePassword(passwordForm){
  if (passwordForm.valid){
    const passwordForm1  = passwordForm.value;
    this.http.updatePassword(this.user.id,passwordForm1).subscribe(
      () => {
        alert("password updated successfuly");
        this.toggleEditPasswordMode();
      },
      (error:HttpErrorResponse) => {
        console.log(error)
        if (error.status === 400) { // Handle bad request
          if (error.error==="New passwords do not match") {
            this.passwordChangeError = 'New passwords do not match';
          } else if (error.error ==="Current password is incorrect") {
            this.passwordChangeError = 'Current password is incorrect';
          } else {
            this.passwordChangeError = 'A bad request error occurred.';
          }
        } else {
          // Handle other errors (e.g., server errors)
          this.passwordChangeError = 'An error occurred while changing password. Please try again.';
        }
      }
    )
  }
}
getInitials(firstName: String, lastName: String): string {
  return `${firstName.charAt(0).toLowerCase()}${lastName.charAt(0).toLowerCase()}`;
}
// Add this method to your component class
togglePasswordVisibility(inputId: string): void {
  const input = document.getElementById(inputId) as HTMLInputElement;
  input.type = input.type === 'password' ? 'text' : 'password';
}

}
