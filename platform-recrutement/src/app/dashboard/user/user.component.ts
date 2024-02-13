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
  data :any []=[];
  constructor (private http: AuthService ){
  }
  ngOnInit(){
     this.loadUsers()
  }

  loadUsers(){
    this.http.getAll().subscribe(
      (data : any) => {
          this.data=data
  })
  }
}
