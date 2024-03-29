import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(
    private router: Router,
    private accountService: AuthService
) {}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//  const user = this.accountService.userValue;
  const login = this.accountService.loginValue;
  const requiredRole = route.data['requiredRole'];
  if (login  && this.accountService.loginValue.role === requiredRole ) {
      return true;
  }else{
  this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
  return false;
  }
}
}
