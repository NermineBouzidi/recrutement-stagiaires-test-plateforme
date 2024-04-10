import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RapportComponent } from './rapport/rapport.component';
import { TestSubmissionComponent } from './test-submission/test-submission.component';



const routes: Routes = [
 
  { path: "", component:    RapportComponent }, // Make this the default route for '/dashboard/test'
  { path: "test", component:  TestSubmissionComponent }, // Make this the default route for '/dashboard/test'


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RapportsRoutingModule { }
