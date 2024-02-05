import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [FormsModule,HttpClientModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  data :any []=[];
  constructor (private http: HttpClient ){
      this.data;
  }

  loadUsers(){
    this.http.get("http://localhost:8080/api/user/getUsers", { observe: 'response' }).subscribe(
      (data : any) => {
          console.log(data);
          this.data=data;
  })

}
}
