import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserspaceRoutingModule } from './userspace-routing.module';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserTestComponent } from './user-test/user-test.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserCodeComponent } from './user-code/user-code.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { UserQuizComponent } from './user-quiz/user-quiz.component';
import { DurationToTimerPipe } from './shared/services/duration-to-timer.pipe';


@NgModule({
  declarations: [
    UserHomeComponent,
    UserTestComponent,
    UserCodeComponent,
    UserQuizComponent,
    DurationToTimerPipe
  ],
  imports: [
    CommonModule,
    UserspaceRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    CodemirrorModule


  ]
})
export class UserspaceModule { }
