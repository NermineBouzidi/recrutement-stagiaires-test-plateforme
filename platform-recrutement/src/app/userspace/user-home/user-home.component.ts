import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent {
  fullname : String ;
  constructor (private http :AuthService,private router :Router){}
  diasbleBack(): void {
    // Disable browser navigation
    this.router.events.subscribe((event) => {
      history.pushState(null, '', window.location.href);
    });
  }
  ngOnInit(): void {
    this.diasbleBack();
    const token = this.http.getToken();
    if (token) {
      const decodedToken :any = jwtDecode(token);
      let name = decodedToken.name;
      this.fullname = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    }
  }

  logout(){
    this.http.logout();
    alert("logout");
}
}

