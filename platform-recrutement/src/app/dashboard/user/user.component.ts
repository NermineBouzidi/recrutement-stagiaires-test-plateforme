import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from 'src/app/shared/models/Users';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AdminService } from '../shared/services/admin.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  
  p:any =0;
  data: any[] = [];
  file :any;
  user :User;
  isOpen :boolean=false
  usersNumber:number ;
  isDialogOpen :boolean=false;
  isTestOpen :boolean=false;
  tests: any[] = [];
  selectedTestId: number;
    constructor (private http: AdminService, private datePipe: DatePipe, private toast :ToastrService ){
    for(let i:number=1; i<=100;i++){
      this.data.push(i as never);
    }
  }
  isDropDownOpenArray: boolean[] = [];

  toggleDropdown(index: number): void {
    this.isDropDownOpenArray[index] = !this.isDropDownOpenArray[index];
  }
  
  ngOnInit(){
     this.loadUsers();
     
     this.isDropDownOpenArray = this.data.map(() => false);

  }

  loadUsers(){
    this.http.getAllUser().subscribe(
      (data : any) => {
          this.data=data
          this.usersNumber= this.data.length;
  })
  }
  openDialog(id:any){
     this.isDialogOpen=true;
     this.http.getUserById(id).subscribe((data:any)=>{
      this.user=data;
      })
  }
  closeDialog() {
    this.isDialogOpen = false;
  }
  

  acceptUser(id : any){
    this.http.accept(id).subscribe(
      ()=>{
        alert("email send suuccesssfully")
        this.loadUsers();

      }
    )
  }
  rejectUser(id : any){
    this.http.reject(id).subscribe(
      ()=>{
        this.toast.showToas("email send successfully");
        this.loadUsers();

      }
    )
  }
  getInitials(firstName: String, lastName: String): string {
    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  }

  getResume(id :any){
    this.http.getResume(id).subscribe(
      (file :any)=>{
        const url = window.URL.createObjectURL(file);
        window.open(url, '_blank');      }
    )

  }
  formatDate(date: any): string {
    return this.datePipe.transform(date, 'MMMM d, y');
  }

  openTest(category:any,id:any){
    console.log(category)
    this.isTestOpen=true;
    this.http.getUserById(id).subscribe((data:any)=>{
      this.user=data;
      })
    this.http.getTestByCategory(category).subscribe((data:any)=>{
     this.tests=data;
     })
 }
 closeTest() {
   this.isTestOpen = false;
 }
 isButtonDisabled(status: string): boolean {
  return status !== 'Accepted';
}
assignTest(testId:any, userId:any){
  this.http.assignTest(testId,userId).subscribe((response) => {
    console.log('Test assigned successfully:', response);
    this.toast.showToas("test assigned successfully");
    
    // Handle success (e.g., trigger a notification or update UI)
  },
  (error: HttpErrorResponse) => {
    console.error('Error assigning test:', error);
    // Handle errors (e.g., display error messages)
  })
}
assignTestandAccept(userId:number){
  this.http.assignTestandAceept(userId).subscribe((response) => {
    console.log('Test assigned successfully:', response);
    this.toast.showToas("test assigned successfully");
    this.loadUsers();
    
    // Handle success (e.g., trigger a notification or update UI)
  },
  (error: HttpErrorResponse) => {
    console.error('Error assigning test:', error);
    // Handle errors (e.g., display error messages)
  })
}
submit(testId:any, userId:any){
  console.log(testId,userId);
}
  
  
}

