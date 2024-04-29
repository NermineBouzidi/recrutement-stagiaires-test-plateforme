import { Component } from '@angular/core';
import { AdminService } from '../shared/services/admin.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/Users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  isOpen = false; // Flag to track modal visibility
  p:any =0;
  usersNumber:number ;
  data: any[] = [];
  searchText: string = ''; // Property to store the search text
  selectedRole: string = '';
  userForm: FormGroup;
  isSubmitted: boolean = false;
  userExist: boolean = false;
  selectedUserId: number;
  isDeleteConfirmationModalOpen = false;


  constructor (private http: AdminService,  private toast :ToastrService, private fb: FormBuilder,){
    this.userForm = this.fb.group({
      firstname: new FormControl('', [Validators.required ,Validators.pattern(/^[a-zA-Z ]+$/)]),
      lastName: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z ]+$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      linkedinUrl: new FormControl(''),
      password:new FormControl("",[Validators.required]),
      role: new FormControl('', [Validators.required ]),
      number: new FormControl('', [Validators.minLength(8),Validators.maxLength(8)]),
      educationLevel: new FormControl('' ),
      specializations: new FormControl(''),
    });
    for(let i:number=1; i<=100;i++){
      this.data.push(i as never);
    }
    this.loadUsers();
  }
  getInitials(firstName: String, lastName: String): string {
    return `${firstName.charAt(0).toLowerCase()}${lastName.charAt(0).toLowerCase()}`;
  }
  // ------------load users---------------
  loadUsers(){
    this.http.getAllUsers().subscribe(
      (data : any) => {
          this.data=data
          this.usersNumber= this.data.length;
  })
  }
  //------------------delete user
  deleteUser(id:any){
    this.http.deleteUser(id).subscribe(
      ()=>{
        this.toast.showToas("test deleted successfully")
        this.onCloseModal()
      }

    )
  }
  openDeleteConfirmationModal(userId: number) {
    this.selectedUserId = userId;
    this.isDeleteConfirmationModalOpen = true;
  }

  // Function to close the delete confirmation modal
  onCloseModal() {
    this.isDeleteConfirmationModalOpen = false;
    this.loadUsers();
  }
  
  openUpdateModal(user: User) {
    // Populate the form fields with the user's data
    this.userForm.patchValue({
        firstname: user.firstname,
        lastName: user.lastName,
        email: user.email,
        linkedinUrl: user.linkedinUrl,
        password: '', // Clear password field or set it to null if you don't want to update it
        role: user.role,
        number: user.number,
        educationLevel: user.educationLevel,
        specializations: user.specializations
    });
    this.isOpen = true;
}
  //------------add user ------------------
  addUser() {
    this.isSubmitted = true;
    const user :User=this.userForm.value
   if (this.userForm.valid) {
    const transformedNumber = this.formatNumber(this.userForm.get('number').value);
    const finalUser = { ...user, number: transformedNumber};
      this.http.createUser(user).subscribe((res: any) => {

          if (  res.body &&  res.body.includes("Registration successful")) {
            this.loadUsers()
            this.closeModal()
            this.toast.showToas("added successfull")
            // Redirect to a new page or perform any other actions after successful registration
          } else {
            alert('failed');
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
  get filteredUsers(): any[] {
    return this.data.filter(user => {
      // Check if the search text matches the user's name, role, or email
      return user.firstname.toLowerCase().includes(this.searchText.toLowerCase()) ||
             user.lastName.toLowerCase().includes(this.searchText.toLowerCase()) ||
             user.role.toLowerCase().includes(this.searchText.toLowerCase()) ||
             user.email.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }
  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.userForm.reset();
    this.isOpen = false;

  }
  formatNumber(input: string): string {
    const numericValue = input.replace(/\D/g, '');
    if (numericValue.length > 0) {
      const formattedValue = numericValue.match(/(\d{1,2})(\d{1,3})(\d{1,3})/);
      return formattedValue.slice(1).join(' ');
    } else {
      return '';
    }
  }
}
