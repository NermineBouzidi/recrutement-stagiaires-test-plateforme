import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTestComponent } from './add-test/add-test.component';
import { UiTestComponent } from './ui-test/ui-test.component';
import { TestsRoutingModule } from './tests-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddTestComponent,
    UiTestComponent,
  ],
  imports: [
    CommonModule,
    TestsRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule

    
  ]
})
export class TestsModule { }
