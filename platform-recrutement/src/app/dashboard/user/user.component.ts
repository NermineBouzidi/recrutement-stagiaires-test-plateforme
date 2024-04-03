import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from 'src/app/models/Users';
import { AuthService } from 'src/app/shared/services/auth.service';

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
  constructor (private http: AuthService , private datePipe: DatePipe ){
    for(let i:number=1; i<=100;i++){
      this.data.push(i as never);
    }
  }
  ngOnInit(){
     this.loadUsers()
  }

  loadUsers(){
    this.http.getAll().subscribe(
      (data : any) => {
          this.data=data
          this.usersNumber= this.data.length;
  })
  }
  openDialog(id:any){
     this.isDialogOpen=true;
     this.http.getById(id).subscribe((data:any)=>{
      this.user=data;
      })
  }
  closeDialog() {
    this.isDialogOpen = false;
   

  }
  deleteUser(id:any){
    this.http.delete(id).subscribe(
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
  toggleActions() {
    const actionButtons = document.querySelector('.action-buttons');
    if (actionButtons.classList.contains('hidden')) {
      actionButtons.classList.remove('hidden');
    } else {
      actionButtons.classList.add('hidden');
    }
  }
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  
  
}
