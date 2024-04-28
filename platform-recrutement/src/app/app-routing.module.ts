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
import { TestPreviewComponent } from './dashboard/tests/test-preview/test-preview.component';
import { UiDashComponent } from './evaluator-space/ui-dash/ui-dash.component';
import { AdminLayoutComponent } from './admin-space/admin-layout/admin-layout.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent }, 
  {
    path: 'dashboard',canActivate:[UserGuard],
   data: { requiredRole: 'ROLE_EVALUATOR' },
    component: UidashboardComponent,
    loadChildren: () => import('./dashboard/dashboard.module').then((m)=> m.DashboardModule)

  },
  {path:'preview', component:TestPreviewComponent},
  {
    path:'user', canActivate:[UserGuard],
    data: { requiredRole: 'ROLE_USER' },
    loadChildren: () => import('./userspace/userspace.module').then((m)=> m.UserspaceModule)
  },
  {
    path:'evaluator-space', canActivate:[UserGuard],
    data: { requiredRole: 'ROLE_ADMIN' },
    component: UiDashComponent,
    loadChildren: () => import('./evaluator-space/evaluator-space.module').then((m)=> m.EvaluatorSpaceModule)
  },
  {
    path:'admin-space', canActivate:[UserGuard],
    data: { requiredRole: 'ROLE_ADMIN' },
    component: AdminLayoutComponent,
    loadChildren: () => import('./admin-space/admin-space.module').then((m)=> m.AdminSpaceModule)
  }
  


]
  

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule ]
})
export class AppRoutingModule { }
