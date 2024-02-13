import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { UidashboardComponent } from './dashboard/uidashboard/uidashboard.component';
import { UserComponent } from './dashboard/user/user.component';
import { TestComponent } from './dashboard/test/test.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { UserGuard } from './shared/services/user.guard';
import { UserHomeComponent } from './userspace/user-home/user-home.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent }, 
  {
    path: 'dashboard', canActivate:[UserGuard],
    component: UidashboardComponent,
    children: [
      { path: '', redirectTo: 'uidash', pathMatch: 'full' },
      { path: 'uidash', component: UidashboardComponent },
      { path: 'user', component: UserComponent },
      { path: 'test', component: TestComponent }
    ]
  },
  {
    path:"user" , component:UserHomeComponent
  }

]
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
