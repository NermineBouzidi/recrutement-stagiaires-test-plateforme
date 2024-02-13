import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseURI = environment.api;

  constructor(private http:  HttpClient) { }
  getAll() {
    return this.http.get<any[]>(this.baseURI + `/api/test/getTests`);
}
}
