import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiTestComponent } from './ui-test/ui-test.component';
import { AddTestComponent } from './add-test/add-test.component';
import { TestComponent } from './test/test.component';
import { TestPreviewComponent } from './test-preview/test-preview.component';
import { AddProblemComponent } from './add-problem/add-problem.component';


const routes: Routes = [
 
  { path: "", component: TestComponent }, // Make this the default route for '/dashboard/test'
  { path: "add-test", component: AddTestComponent}, 
  { path: "preview", component: TestPreviewComponent}, 
  {path:"add-problem", component:AddProblemComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestsRoutingModule { }
