import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/Users';
import { UserDTO } from 'src/app/signup/signup.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURI = environment.api;
  
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  //----------------------------//
  private loginSubject :BehaviorSubject<LoginResponse>;
  public loginResponse :Observable<LoginResponse>;
  
  constructor(private http:  HttpClient, private router : Router) { 
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
        this.loginSubject = new BehaviorSubject<LoginResponse>(JSON.parse(localStorage.getItem('response')));
        this.loginResponse = this.loginSubject.asObservable();
  }
  public get userValue(): User {
    return this.userSubject.value;
}
public get loginValue(): LoginResponse {
    return this.loginSubject.value;
}

login(email, password) {
    return this.http.post<LoginResponse>(this.baseURI + `/api/auth/login`, { email, password })
        .pipe(map(response => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            sessionStorage.setItem('response', JSON.stringify(response));
            this.loginSubject.next(response);
            return response;
        }));
}
/*
login(email, password) {
    return this.http.post<User>(this.baseURI + `/api/auth/login`, { email, password })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            sessionStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
        }));
}*/

logout() {
    // remove user from local storage and set current user to null
    sessionStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
}

signup(user :UserDTO, file :File) {
  // console.log(user)
  const formData = new FormData();
  formData.append('user', JSON.stringify(user));
  formData.append('file', file);
  
    return this.http.post(this.baseURI + `/api/auth/signup`, formData);
}
register(user :UserDTO){
    return this.http.post(this.baseURI + `/api/auth/register`, user,{observe: 'response' ,responseType: 'text'});

}

getAll() {
    return this.http.get<User[]>(this.baseURI + `/api/user/getUsers`);
}

getById(id: string) {
    return this.http.get<User>(this.baseURI + `/api/user/getUser/${id}`);
}

update(id, params) {
    return this.http.put(this.baseURI + `/users/${id}`, params)
        .pipe(map(x => {
            // update stored user if the logged in user updated their own record
            if (id == this.userValue.id) {
                // update local storage
                const user = { ...this.userValue, ...params };
                localStorage.setItem('user', JSON.stringify(user));

                // publish updated user to subscribers
                this.userSubject.next(user);
            }
            return x;
        }));
}

delete(id: string) {
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
// get token 
getToken(){
    return this.loginValue.token;
}
}


export interface LoginResponse {
    token: string;
    role: string;
  }
  