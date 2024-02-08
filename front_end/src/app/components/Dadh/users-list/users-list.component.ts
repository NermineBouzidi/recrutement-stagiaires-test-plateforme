import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpResponse,HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [FormsModule,HttpClientModule,NgFor],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {
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
