import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { UidashboardComponent } from './dashboard/uidashboard/uidashboard.component';


import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { UserGuard } from './shared/services/user.guard';

import { AdminLayoutComponent } from './admin-space/admin-layout/admin-layout.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent }, 
  {
    path: 'dashboard',canActivate:[UserGuard],
   data: { requiredRole: 'ROLE_EVALUATOR' },
    component: UidashboardComponent,
    loadChildren: () => import('./dashboard/dashboard.module').then((m)=> m.DashboardModule)

  },
  {
    path:'user', canActivate:[UserGuard],
    data: { requiredRole: 'ROLE_USER' },
    loadChildren: () => import('./userspace/userspace.module').then((m)=> m.UserspaceModule)
  },
 
  {
    path:'admin-space', canActivate:[UserGuard],
    data: { requiredRole: 'ROLE_ADMIN' },
    component: AdminLayoutComponent,
    loadChildren: () => import('./admin-space/admin-space.module').then((m)=> m.AdminSpaceModule)
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },



]
  

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule ]
})
export class AppRoutingModule { }
