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
  
  public user: Observable<User>;
  //----------------------------//
  private loginSubject :BehaviorSubject<LoginResponse>;
  public loginResponse :Observable<LoginResponse>;
  
  constructor(private http:  HttpClient, private router : Router) { 
  
        this.loginSubject = new BehaviorSubject<LoginResponse>(JSON.parse(localStorage.getItem('response')));
        this.loginResponse = this.loginSubject.asObservable();
  }

public get loginValue(): LoginResponse {
    return this.loginSubject.value;
}
public clearLoginValue(): void {
    sessionStorage.removeItem('response');
    this.loginSubject.next(null); 
 }

login(email, password, rememberMe :boolean) {
    return this.http.post<LoginResponse>(this.baseURI + `/api/auth/login`, { email, password })
        .pipe(map(response => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            if (rememberMe) {
                // Store login information in localStorage for persistence (with appropriate security measures)
                localStorage.setItem('response', JSON.stringify(response)); // **Security Risk:** Avoid storing password
              } else {
                localStorage.removeItem('response');
                 sessionStorage.setItem('response', JSON.stringify(response));
            this.loginSubject.next(response);
              }
              console.log(localStorage.getItem('rememberMe'))
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
    sessionStorage.removeItem('response');
    this.loginSubject.next(null);

}

signup(formData :FormData) {

    return this.http.post(this.baseURI + `/api/auth/signup`, formData,{observe: 'response' ,responseType: 'text'});
}
register(user :UserDTO){
    return this.http.post(this.baseURI + `/api/auth/register`, user,{observe: 'response' ,responseType: 'text'});

}


/*
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
}*/


// get token 
getToken(){
    return this.loginValue.token;
}

  
}


export interface LoginResponse {
    token: string;
    role: string;
  }
  