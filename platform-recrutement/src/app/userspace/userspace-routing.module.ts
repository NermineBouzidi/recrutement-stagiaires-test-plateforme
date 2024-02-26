import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTestComponent } from './user-test/user-test.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserCodeComponent } from './user-code/user-code.component';

const routes:  Routes = [
  { path: "", component: UserHomeComponent },
  { path: "test", component: UserTestComponent },
  {path:"code", component:UserCodeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserspaceRoutingModule { }
