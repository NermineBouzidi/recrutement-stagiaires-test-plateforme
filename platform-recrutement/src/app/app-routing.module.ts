import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { UidashboardComponent } from './dashboard/uidashboard/uidashboard.component';
import { UserComponent } from './dashboard/user/user.component';
import { TestComponent } from './dashboard/tests/test/test.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { UserGuard } from './shared/services/user.guard';
import { UserHomeComponent } from './userspace/user-home/user-home.component';
import { UserTestComponent } from './userspace/user-test/user-test.component';
import { FormsModule } from '@angular/forms';
import { TestPreviewComponent } from './dashboard/test-preview/test-preview.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent }, 
  {
    path: 'dashboard', canActivate:[UserGuard],
   data: { requiredRole: 'ROLE_ADMIN' },
    component: UidashboardComponent,
    loadChildren: () => import('./dashboard/dashboard.module').then((m)=> m.DashboardModule)

  },
  {path:'preview', component:TestPreviewComponent},
  {
    path:'user', canActivate:[UserGuard],
    data: { requiredRole: 'ROLE_USER' },
    loadChildren: () => import('./userspace/userspace.module').then((m)=> m.UserspaceModule)
  }
  


]
  

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule ]
})
export class AppRoutingModule { }
