import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTestComponent } from './add-test/add-test.component';
import { UiTestComponent } from './ui-test/ui-test.component';
import { TestsRoutingModule } from './tests-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProblemComponent } from './add-problem/add-problem.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { QuillModule } from 'ngx-quill';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddQuizComponent } from './add-quiz/add-quiz.component';


@NgModule({
  declarations: [
    AddTestComponent,
    UiTestComponent,
    AddProblemComponent,
    AddQuizComponent,
  ],
  imports: [
    CommonModule,
    TestsRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule,
    QuillModule,
    NgSelectModule
    
  ]
})
export class TestsModule { }
