import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/Users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURI = environment.api;
  
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  
  constructor(private http:  HttpClient, private router : Router) { 
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
  }
  public get userValue(): User {
    return this.userSubject.value;
}

login(email, password) {
    return this.http.post<User>(this.baseURI + `/api/auth/login`, { email, password })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            sessionStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
        }));
}

logout() {
    // remove user from local storage and set current user to null
    sessionStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
}

register(user: User) {
    console.log(user)
    return this.http.post(this.baseURI + `/api/v1/auth/register`, user);
}

getAll() {
    return this.http.get<User[]>(this.baseURI + `/users`);
}

getById(id: string) {
    return this.http.get<User>(this.baseURI + `/users/${id}`);
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
    return this.http.delete(this.baseURI + `/users/${id}`)
        .pipe(map(x => {
            // auto logout if the logged in user deleted their own record
            if (id == this.userValue.id) {
                this.logout();
            }
            return x;
        }));
}
}