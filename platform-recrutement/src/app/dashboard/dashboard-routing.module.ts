import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { TestComponent } from './test/test.component';
import { UidashboardComponent } from './uidashboard/uidashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { DashComponent } from './dash/dash.component';
import { RapportComponent } from './rapport/rapport.component';

const routes: Routes = [
   {path :"" ,component :DashComponent},
   {path :"uidash" ,component :DashComponent},
   {path:"user",component :UserComponent},
   {path:"test",component :TestComponent},
   {path: "profile", component:ProfileComponent},
   {path: "rapport", component:RapportComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
