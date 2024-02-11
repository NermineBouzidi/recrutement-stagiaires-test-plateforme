import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  data :any []=[];
  constructor (private http: HttpClient ){
  }
  ngOnInit(){
     this.loadUsers()
  }

  loadUsers(){
    this.http.get("http://localhost:8080/api/user/getUsers" ).subscribe(
      (data : any) => {
          this.data=data
  })
  }
}
