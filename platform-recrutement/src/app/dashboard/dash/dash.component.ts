import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AdminService } from '../shared/services/admin.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent {

  data: any[] = [];
  usersNumber:number ;

  constructor (private http: AdminService,private router :Router,private Http :AuthService ){
    this.loadUsers()
  }
  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url === '/login') {
        this.Http.logout();
      }
    });
  }
  getInitials(firstName: String, lastName: String): string {
    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  }
    loadUsers(){
      this.http.getAllUser().subscribe(
        (data : any) => {
          const users= data;
          this.usersNumber= data.length;
          this.data=users.slice(0, 5) // Slice the array to get only the first 5 elements
        })
    }
}
