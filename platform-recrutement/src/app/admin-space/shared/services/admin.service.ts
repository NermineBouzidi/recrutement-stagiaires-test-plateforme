import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/Users';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseURI = environment.api;
  public user: Observable<User>;

  constructor(private http: HttpClient) {}
  ///-------------------user-------------------------
  getAllUsers() {
    return this.http.get<any[]>(this.baseURI + `/api/user/getAllUsers`);
  }

  getUserById(id: string) {
    return this.http.get<User>(this.baseURI + `/api/user/getUser/${id}`);
  }
  updateUser(id: any, user: User) {
    return this.http.put(this.baseURI + `/api/user/update/${id}`, user, {
      observe: 'response',
      responseType: 'text',
    });
  }
  deleteUser(id: any) {
    return this.http.delete(this.baseURI + `/api/user/deleteUser/${id}`)
  }
  createEvaluator(user :User){
    return this.http.post(this.baseURI + `/api/user/addEvaluator`, user,{ observe: 'response' ,responseType: 'text'});
  } 
  getUserRegistrationData(year:number){
    return this.http.get<any[]>(this.baseURI + `/api/dash/user-registrations-by-month/${year}`);

  }
  getDashboardCounts(): Observable<DashboardCounts> {
    return this.http.get<DashboardCounts>(this.baseURI +`/api/user/counts`);
  }
}
export interface DashboardCounts {
  usersCount: number;
  testsSubmittedCount: number;
  totalTestsCount: number;
}
