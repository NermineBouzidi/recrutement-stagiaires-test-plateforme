import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { DashboardSidebarComponent } from '../dashboard-sidebar/dashboard-sidebar.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-tests-list',
  standalone: true,
  imports: [HttpClientModule,NgFor,RouterModule],
  templateUrl: './tests-list.component.html',
  styleUrl: './tests-list.component.css'
})
export class TestsListComponent {
  data :any []=[];
  constructor (private http: HttpClient ){
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
}
