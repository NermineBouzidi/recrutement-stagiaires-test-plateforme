import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { TestComponent } from './test/test.component';
import { UserComponent } from './user/user.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UidashboardComponent } from './uidashboard/uidashboard.component';


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
