import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserspaceService {
  baseURI = environment.api;

  constructor(private http: HttpClient) {}

getAssinedTest(token: string) {
  // Retrieve user ID from token-based API endpoint
  const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

 return this.http.get(this.baseURI + '/api/user-test/assigned', { headers })
}

setAnswers(id:any ,submissionAnswers:any){
 
  return this.http.put(this.baseURI + `/api/user-test/set-answers/${id}`,submissionAnswers,{ observe: 'response' ,responseType: 'text'});

}


}
