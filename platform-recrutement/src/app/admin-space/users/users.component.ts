import { Component } from '@angular/core';
import { AdminService } from '../shared/services/admin.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  p:any =0;
  usersNumber:number ;
  data: any[] = [];
  searchText: string = ''; // Property to store the search text
  selectedRole: string = '';


  constructor (private http: AdminService,  private toast :ToastrService ){
    for(let i:number=1; i<=100;i++){
      this.data.push(i as never);
    }
    this.loadUsers();
  }
  getInitials(firstName: String, lastName: String): string {
    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  }
  loadUsers(){
    this.http.getAllUsers().subscribe(
      (data : any) => {
          this.data=data
          this.usersNumber= this.data.length;
  })
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
}
