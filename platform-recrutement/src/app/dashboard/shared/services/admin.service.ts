import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from 'src/app/models/Quiz';
import { Test } from 'src/app/models/Test';
import { User } from 'src/app/models/Users';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseURI = environment.api;
  public user: Observable<User>;

  constructor(private http: HttpClient) {}
  ///-------------------user-------------------------
  getAllUser() {
    return this.http.get<User[]>(this.baseURI + `/api/user/getUsers`);
}

getUserById(id: string) {
    return this.http.get<User>(this.baseURI + `/api/user/getUser/${id}`);
}
updateUser(id :any,user :User){
    return this.http.put(this.baseURI + `/api/user/update/${id}`, user,{ observe: 'response' ,responseType: 'text'});

}
updatePassword(id :any, request:any){
    return this.http.post(this.baseURI + `/api/user/changePassword/${id}`,request,{});

}
deleteUser(id: any) {
  return this.http.delete(this.baseURI + `/api/user/deleteUser/${id}`)
}

accept(id:String){
  return this.http.put(this.baseURI + `/api/user/accept/${id}`,{});
}
reject(id:String){
  return this.http.put(this.baseURI + `/api/user/reject/${id}`,{});
}
getResume (id :any){
 return this.http.get(this.baseURI + `/api/user/getFile/${id}`, { responseType: 'blob' });
}
getUserProfileFromToken(token: string) {
  // Retrieve user ID from token-based API endpoint
  const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

 return this.http.get<User>(this.baseURI + '/api/user/mee', { headers })
  
}
////-------------------------Test--------------------------
 
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
    return this.http.get(this.baseURI + `/api/quiz/getQuiz/${id}`);

  }
  ///--------------------Problems
  getAllProblem(){
    return this.http.get<any[]>(this.baseURI + `/api/quiz/getAllProblem`);
  }
  addProblem(problem :any){
    return this.http.post(this.baseURI + `/api/quiz/addProblem`, problem,{ observe: 'response' ,responseType: 'text'});
  }
  deleteProblem(id : any) {
    return this.http.delete(this.baseURI + `/api/quiz/deleteProblem/${id}`)
  }
  getProblemById(id:any){
    return this.http.get(this.baseURI + `/api/quiz/getProblem/${id}`);

  }
  addTrueFalse(quiz:any){
    return this.http.post(this.baseURI + `/api/quiz/addTrueFalse`, quiz,{ observe: 'response' ,responseType: 'text'});
  }
  updateTrueFalse(id:any ,quiz :Quiz){
    return this.http.put(this.baseURI + `/api/quiz/updateTrueFalse/${id}`, quiz,{ observe: 'response' ,responseType: 'text'});
  }
  addMultipleChoice(quiz:any){
    return this.http.post(this.baseURI + `/api/quiz/addMulti`, quiz,{ observe: 'response' ,responseType: 'text'});
  }
  getAllTest(){
    return this.http.get<any[]>(this.baseURI + `/api/test/getAllTest`);
  }
  deleteTest(id : any) {
    return this.http.delete(this.baseURI + `/api/test/deleteTest/${id}`)
  }
  addTest(problem :any){
    return this.http.post(this.baseURI + `/api/test/addTest`, problem,{ observe: 'response' ,responseType: 'text'});
  }
  assignTest(testId: any, userId: any){
    const requestBody = { testId, userId };
    return this.http.post(this.baseURI + `/api/test/assign-test`, requestBody,{ observe: 'response' ,responseType: 'text'});
  }
  getTestByCategory(category:any){
    return this.http.get<any[]>(this.baseURI + `/api/test/category/${category}`);

  }
  getTestById(id:any){
    return this.http.get<any[]>(this.baseURI + `/api/test/getTest/${id}`);

  }
  getAllRapport(){
    return this.http.get<any[]>(this.baseURI + `/api/test/getAllTestSubmission`);
  }
  getAllAnswers(testSubmissionId:any){
    return this.http.get<any[]>(this.baseURI + `/api/test/getAnswers/${testSubmissionId}`);
  }
  setPoints(testSubmissionId:any,updatedPoints: any){
    return this.http.put(this.baseURI + `/api/test/problemAnswers-points/${testSubmissionId}`, updatedPoints,{ observe: 'response' ,responseType: 'text'});

  }
}
