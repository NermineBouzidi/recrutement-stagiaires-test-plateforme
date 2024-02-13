import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { TestComponent } from './test/test.component';
import { UserComponent } from './user/user.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UidashboardComponent } from './uidashboard/uidashboard.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../shared/services/jwt.interceptor.service';


@NgModule({
  declarations: [
    TestComponent,
    UserComponent,
    SidebarComponent,
    UidashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
