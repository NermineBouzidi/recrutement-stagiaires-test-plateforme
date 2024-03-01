import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { jwtDecode } from 'jwt-decode';




@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private accountService: AuthService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {      
        const userlogin = this.accountService.loginValue;
        const isLoggedIn = userlogin && userlogin.token ;
        const isApiUrl = request.url.startsWith(this.accountService.baseURI);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${userlogin.token}`
                }
            });
        }
        const token = request.headers.get('Authorization');
        if (token) {
            // Decode the token using a library like jsonwebtoken (not included)
            const decodedToken :any = jwtDecode(token);
            console.log("Decoded Token:", decodedToken);

            // Check if the token is expired
            if (decodedToken.exp < Date.now() / 1000) {
                // Handle token expiration
              this.accountService.logout();
            }
          }

        return next.handle(request);
    }
}