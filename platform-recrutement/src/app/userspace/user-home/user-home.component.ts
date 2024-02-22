import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent {
  fullname : String ;
  constructor (private http :AuthService){}
  ngOnInit(): void {
    const token = this.http.getToken();
    if (token) {
      const decodedToken :any = jwtDecode(token);
      this.fullname = decodedToken.name;
    }
  }

  logout(){
    this.http.logout();
    alert("logout");
}
}

