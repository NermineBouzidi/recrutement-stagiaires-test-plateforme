import { HttpClient } from '@angular/common/http';
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
}
