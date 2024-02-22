import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserspaceRoutingModule } from './userspace-routing.module';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserTestComponent } from './user-test/user-test.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserHomeComponent,
    UserTestComponent
  ],
  imports: [
    CommonModule,
    UserspaceRoutingModule,
    ReactiveFormsModule

  ]
})
export class UserspaceModule { }
