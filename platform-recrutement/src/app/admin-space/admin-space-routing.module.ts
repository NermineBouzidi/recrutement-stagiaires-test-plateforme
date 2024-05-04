import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path :"dashboard" ,component :DashboardComponent},
  {path: "profile", component:AdminProfileComponent},
  {path: "users", component:UsersComponent},
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSpaceRoutingModule { }
