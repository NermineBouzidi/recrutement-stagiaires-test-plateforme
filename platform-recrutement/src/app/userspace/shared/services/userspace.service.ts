import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserspaceService {
  baseURI = environment.api;

  constructor(private http: HttpClient) {}
  getAllQuiz(){
    return this.http.get<any[]>(this.baseURI + `/api/test/getAllQuiz`);
}
getAllProblem(){
  return this.http.get<any[]>(this.baseURI + `/api/test/getAllProblem`);
}
getAssinedTest(token: string) {
  // Retrieve user ID from token-based API endpoint
  const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

 return this.http.get(this.baseURI + '/api/userTest/assigned-test', { headers })
}
}
