import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserspaceService } from '../shared/services/userspace.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent {
  fullname : String ;
  test: any = {};
  quizzes: any[];
  problems: any[];
  quizzesPerPage: number = 1; // Number of quizzes to display per page
  currentPage: number = 1;
  totalPages: number;
  isSubmited :boolean=false;
  constructor (private router :Router,private http :UserspaceService,private Http :AuthService,private h:HttpClient){}
  diasbleBack(): void {
    // Disable browser navigation
    this.router.events.subscribe((event) => {
      history.pushState(null, '', window.location.href);
    });
  }
  ngOnInit(): void {
    this.diasbleBack();
    const token = this.Http.getToken();
    if (token) {
      const decodedToken :any = jwtDecode(token);
      let name = decodedToken.name;
      this.fullname = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    }
  this.loadTest();
  }
  loadTest(){
    const token = this.Http.getToken();
    this.http.getAssinedTest(token).subscribe((data:any)=>{
      this.test=data;
      this.quizzes= shuffle(data.quizzes);
      this.problems= shuffle(data.problems);
    }, (error: any) => {
      if (error.status === 401 ){
        this.router.navigateByUrl("/user/testCompletion")
      }
    }
  )
    

  }

  logout(){
    this.Http.logout();
    alert("logout");
}


}
function shuffle(array: any[]) {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
