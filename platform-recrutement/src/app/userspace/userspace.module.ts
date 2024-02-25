import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserspaceRoutingModule } from './userspace-routing.module';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserTestComponent } from './user-test/user-test.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserCodeComponent } from './user-code/user-code.component';


@NgModule({
  declarations: [
    UserHomeComponent,
    UserTestComponent,
    UserCodeComponent,
  ],
  imports: [
    CommonModule,
    UserspaceRoutingModule,
    ReactiveFormsModule,
    RouterModule,

  ]
})
export class UserspaceModule { }
