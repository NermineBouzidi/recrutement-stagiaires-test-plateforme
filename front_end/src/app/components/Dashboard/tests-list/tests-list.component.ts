import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { DashboardSidebarComponent } from '../dashboard-sidebar/dashboard-sidebar.component';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-tests-list',
  standalone: true,
  imports: [HttpClientModule,NgFor,RouterModule,MatIconModule,FormsModule],
  templateUrl: './tests-list.component.html',
  styleUrl: './tests-list.component.css'
})
export class TestsListComponent {
  data :any []=[];
  constructor (private http: HttpClient,private router :Router ){
  }
  ngOnInit(){
     this.loadTests()
  }

  loadTests(){
    this.http.get("http://localhost:8080/api/test/getTests" ).subscribe(
      (data : any) => {
          this.data=data
  })
  }
  deleteTest(test :any){
    this.http.delete(`http://localhost:8080/api/test/deleteTest/${test.id}`).subscribe(
      ()=>{
        alert("test deleted");
        this.router.navigate(["/dashboard/tests"]);
      }
    )
  }
 


}
