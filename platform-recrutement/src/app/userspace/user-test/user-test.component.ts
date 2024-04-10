import { Component, Input } from '@angular/core';
import { AdminService } from 'src/app/dashboard/shared/services/admin.service';
import { UserspaceService } from '../shared/services/userspace.service';
import { timer } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-test',
  templateUrl: './user-test.component.html',
  styleUrls: ['./user-test.component.scss']
})
export class UserTestComponent {
  test: any = {};
  quizzes: any[];
  problems: any[];
  itemsPerPage = 1;
  currentPage = 0;
  constructor (private router :Router,private http :UserspaceService,private Http :AuthService){}
  diasbleBack(): void {
    // Disable browser navigation
    this.router.events.subscribe((event) => {
      history.pushState(null, '', window.location.href);
    });
  }
  ngOnInit(): void {
    this.diasbleBack();
    this.loadTest();
  }
  loadTest(){
    const token = this.Http.getToken();
    this.http.getAssinedTest(token).subscribe((data:any)=>{
      this.test=data;
      this.quizzes= shuffle(data.quizzes);
      this.problems= shuffle(data.problems);
      })

  }
  get currentPageProblems() {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.problems.slice(startIndex, endIndex);
  }

  get currentPageQuizzes() {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.quizzes.slice(startIndex, endIndex);
  }

  nextPage() {
    const totalPages = Math.ceil(Math.max(this.problems.length, this.quizzes.length) / this.itemsPerPage);
    this.currentPage = (this.currentPage + 1) % totalPages;
  }

  previousPage() {
    const totalPages = Math.ceil(Math.max(this.problems.length, this.quizzes.length) / this.itemsPerPage);
    this.currentPage = (this.currentPage - 1 + totalPages) % totalPages;
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
