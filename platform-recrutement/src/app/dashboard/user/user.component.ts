import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from 'src/app/models/Users';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AdminService } from '../shared/services/admin.service';

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
  constructor (private http: AdminService, private datePipe: DatePipe ){
    for(let i:number=1; i<=100;i++){
      this.data.push(i as never);
    }
  }
  ngOnInit(){
     this.loadUsers()
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
  deleteUser(id:any){
    this.http.deleteUser(id).subscribe(
      ()=>{
        alert("test deleted successfully")
        this.loadUsers();
      }

    )
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
        alert("email send suuccesssfully")
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

  openTest(category:any){
    this.isTestOpen=true;
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
  
  
  
}

