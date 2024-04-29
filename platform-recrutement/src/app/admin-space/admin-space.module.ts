import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AdminSpaceRoutingModule } from './admin-space-routing.module';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { UsersComponent } from './users/users.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule, NgSelectOption } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxPaginationModule } from 'ngx-pagination';
import { QuillModule } from 'ngx-quill';


@NgModule({
  declarations: [
    AdminProfileComponent,
    UsersComponent,
    SidebarComponent,
    DashboardComponent,
    AdminLayoutComponent
  ],
  imports: [
    CommonModule,
    AdminSpaceRoutingModule,
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
export class AdminSpaceModule { }
