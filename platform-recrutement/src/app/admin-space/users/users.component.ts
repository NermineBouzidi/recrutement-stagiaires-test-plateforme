import { Component } from '@angular/core';
import { AdminService } from '../shared/services/admin.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/shared/models/Users';

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
  selectedRole: string = 'ALL';
  userForm: FormGroup;
  isSubmitted: boolean = false;
  userExist: boolean = false;
  selectedUser: User;
  isDeleteConfirmationModalOpen = false;
  user :User;
  isViewModelOpen :boolean=false;


  constructor (private http: AdminService,  private toast :ToastrService, private fb: FormBuilder,){
    this.userForm = this.fb.group({
      firstname: new FormControl('', [Validators.required ,Validators.pattern(/^[a-zA-Z ]+$/)]),
      lastName: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z ]+$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      number: new FormControl('', [ Validators.required,Validators.minLength(8),Validators.maxLength(8)]),
    });
    for(let i:number=1; i<=100;i++){
      this.data.push(i as never);
    }
    this.loadUsers();
    console.log(this.selectedRole)
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
  
    get filteredUsers(): any[] {
  return this.data.filter(user => {
    // Combine search text and role filtering with logical AND
    const searchTermMatch =
      user.firstname.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.lastName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchText.toLowerCase());

    // Apply role filter only if selectedRole has a value
    const roleMatch = this.selectedRole === 'ALL' || user.role.toLowerCase() === this.selectedRole.toLowerCase();

    // Return users matching both search and role (if applicable)
    return searchTermMatch && roleMatch;
  });
}

  //------------------delete user
  deleteUser(id:any){
    this.http.deleteUser(id).subscribe(
      ()=>{
        this.toast.showToas("User deleted successfully")
        this.onCloseModal()
      }

    )
  }
  openDeleteConfirmationModal(user) {
    this.selectedUser = user;
    this.isDeleteConfirmationModalOpen = true;
  }
 

  // Function to close the delete confirmation modal
  onCloseModal() {
    this.isDeleteConfirmationModalOpen = false;
    this.loadUsers();
  }
  
  openViewModel(user){
    this.user=user;
    this.isViewModelOpen =true;
  }
  onCloseViewModel(){
    this.isViewModelOpen=false;
  }
  //------------add user ------------------
  formatNumber(input: string): string {
    const numericValue = input.replace(/\D/g, '');
    if (numericValue.length > 0) {
      const formattedValue = numericValue.match(/(\d{1,2})(\d{1,3})(\d{1,3})/);
      return formattedValue.slice(1).join(' ');
    } else {
      return '';
    }
  }
  addUser() {
    this.isSubmitted = true;
   if (this.userForm.valid) {
    const user :User=this.userForm.value
    const transformedNumber = this.formatNumber(this.userForm.get('number').value);
    const finalUser = { ...user, number: transformedNumber};
      this.http.createEvaluator(finalUser).subscribe((res: any) => {
          if (  res.body &&  res.body.includes("Registration successful. Email sent successfully.")) {
            this.loadUsers()
            this.closeModal()
            this.isSubmitted=false;
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

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.userForm.reset();
    this.isOpen = false;

  }
 
}
