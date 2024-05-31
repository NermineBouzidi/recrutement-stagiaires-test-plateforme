import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { TestComponent } from './tests/test/test.component';
import { UidashboardComponent } from './uidashboard/uidashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { DashComponent } from './dash/dash.component';
import { RapportComponent } from './rapports/rapport/rapport.component';
import { TestPreviewComponent } from './tests/test-preview/test-preview.component';
import { UiTestComponent } from './tests/ui-test/ui-test.component';
import { UiRapportsComponent } from './rapports/ui-rapports/ui-rapports.component';
import { ProblemAndQuizComponent } from './problem-and-quiz/problem-and-quiz.component';
import { AddProblemComponent } from './add-problem/add-problem.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { AddQuizTrueFalseComponent } from './add-quiz-true-false/add-quiz-true-false.component';

const routes: Routes = [
   {path:"user",component :UserComponent},
   {path:"problem-quiz" , component:ProblemAndQuizComponent},
   {path:"problem-quiz/add-problem", component:AddProblemComponent},
   {path:"problem-quiz/add-quiz", component:AddQuizComponent},
   {path:"problem-quiz/add-quiz-TrueFalse", component:AddQuizTrueFalseComponent},
   {path:"test",component :UiTestComponent,
   loadChildren: () => import('./tests/tests.module').then((m)=> m.TestsModule)
  },
   {path: "profile", component:ProfileComponent},
   {path:"rapport",component :UiRapportsComponent,
   loadChildren: () => import('./rapports/rapports.module').then((k)=> k.RapportsModule)
  },
  { path: '**', redirectTo: 'user', pathMatch: 'full' }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
