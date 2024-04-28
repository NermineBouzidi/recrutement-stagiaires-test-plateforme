import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { EvaluatorSpaceRoutingModule } from './evaluator-space-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxPaginationModule } from 'ngx-pagination';
import { QuillModule } from 'ngx-quill';
import { UserComponent } from './user/user.component';
import { RouterModule } from '@angular/router';
import { UiDashComponent } from './ui-dash/ui-dash.component';


@NgModule({
  declarations: [
    
    SidebarComponent,
    ProfileComponent,
    UserComponent,
    UiDashComponent
  ],
  imports: [
    CommonModule,
    EvaluatorSpaceRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    AngularEditorModule,
    HttpClientModule,
    QuillModule,
    DatePipe,
  ],
  providers: [DatePipe]

})
export class EvaluatorSpaceModule { }
