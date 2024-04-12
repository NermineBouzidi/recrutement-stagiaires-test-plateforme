import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTestComponent } from './user-test/user-test.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserCodeComponent } from './user-code/user-code.component';
import { TestCompletionComponent } from './test-completion/test-completion.component';
import { UserQuizComponent } from './user-quiz/user-quiz.component';

const routes:  Routes = [
  { path: "", component: UserHomeComponent },
  { path: "test", component: UserTestComponent },
  {path:"code", component:UserCodeComponent},
  {path:"quiz", component:UserQuizComponent},
  {path:"testCompletion",component:TestCompletionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserspaceRoutingModule { }
