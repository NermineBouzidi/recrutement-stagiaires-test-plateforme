import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiTestComponent } from './ui-test/ui-test.component';
import { AddTestComponent } from './add-test/add-test.component';
import { TestComponent } from './test/test.component';
import { TestPreviewComponent } from './test-preview/test-preview.component';


const routes: Routes = [
 
  { path: "", component: TestComponent }, // Make this the default route for '/dashboard/test'
  { path: "addTest", component: AddTestComponent}, 
  { path: "preview", component: TestPreviewComponent}, 


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestsRoutingModule { }
