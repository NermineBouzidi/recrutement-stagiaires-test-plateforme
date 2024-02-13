import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
