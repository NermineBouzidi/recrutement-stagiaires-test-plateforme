import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quiz } from 'src/app/models/Quiz';
import { Test } from 'src/app/models/Test';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseURI = environment.api;

  constructor(private http: HttpClient) {}
  getAll() {
    return this.http.get<any[]>(this.baseURI + `/api/test/getTests`);
  }
  add(test :Test){
    return this.http.post(this.baseURI + `/api/test/addTest`, test,{ observe: 'response' ,responseType: 'text'});

  }
  delete(id : any) {
    return this.http.delete(this.baseURI + `/api/test/deleteTest/${id}`)
  }
  getById(id: string) {
    return this.http.get<Test>(this.baseURI + `/api/test/getTest/${id}`);
}
  update(id:any ,test:Test){
    return this.http.put(this.baseURI + `/api/test/updateTest/${id}`, test,{ observe: 'response' ,responseType: 'text'});

  }
  // quiz
  addQuiz(quiz :Quiz){
    return this.http.post(this.baseURI + `/api/quiz/addQuiz`, quiz,{ observe: 'response' ,responseType: 'text'});

  }
  getAllQuiz(){
    return this.http.get<any[]>(this.baseURI + `/api/quiz/getAllQuiz`);

  }
  updateQuiz(id:any ,quiz :Quiz){
    return this.http.put(this.baseURI + `/api/quiz/updateQuiz/${id}`, quiz,{ observe: 'response' ,responseType: 'text'});
  }
  deleteQuiz(id : any) {
    return this.http.delete(this.baseURI + `/api/quiz/deleteQuiz/${id}`)
  }
  getQuizById(id:any){
    return this.http.get<Quiz>(this.baseURI + `/api/quiz/getQuiz/${id}`);

  }
  getAllProblem(){
    return this.http.get<any[]>(this.baseURI + `/api/quiz/getAllProblem`);

  }
}
