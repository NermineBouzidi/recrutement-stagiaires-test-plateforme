import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent {

  data: any[] = [];
  constructor (private http: AuthService ){
    this.loadUsers()
  }
  getInitials(firstName: String, lastName: String): string {
    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  }
    loadUsers(){
      this.http.getAll().subscribe(
        (data : any) => {
          const users= data;
          this.data=users.slice(0, 5) // Slice the array to get only the first 5 elements
        })
    }
}
