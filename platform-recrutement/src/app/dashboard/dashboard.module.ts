import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { TestComponent } from './tests/test/test.component';
import { UserComponent } from './user/user.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UidashboardComponent } from './uidashboard/uidashboard.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from '../shared/services/jwt.interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileComponent } from './profile/profile.component';
import { DashComponent } from './dash/dash.component';
import { RapportComponent } from './rapports/rapport/rapport.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { QuillModule } from 'ngx-quill';
import { TestPreviewComponent } from './tests/test-preview/test-preview.component';
import { ProblemAndQuizComponent } from './problem-and-quiz/problem-and-quiz.component';
import { SharedModule } from '../shared/Components/shared/shared.module';
import { AddQuizTrueFalseComponent } from './add-quiz-true-false/add-quiz-true-false.component';


@NgModule({
  declarations: [
    TestComponent,
    UserComponent,
    SidebarComponent,
    UidashboardComponent,
    ProfileComponent,
    DashComponent,
    RapportComponent,
    TestPreviewComponent,
    ProblemAndQuizComponent,
    AddQuizTrueFalseComponent,
    
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    AngularEditorModule,
    HttpClientModule,
    QuillModule,
    DatePipe,
    SharedModule
    

  ],
  providers: [DatePipe]
})
export class DashboardModule { }
