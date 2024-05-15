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
import { TestCompletionComponent } from './test-completion/test-completion.component';


@NgModule({
  declarations: [
    UserHomeComponent,
    UserTestComponent,
    UserCodeComponent,
    UserQuizComponent,
    TestCompletionComponent
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
