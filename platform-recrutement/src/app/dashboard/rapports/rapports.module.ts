import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestSubmissionComponent } from './test-submission/test-submission.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TestsRoutingModule } from '../tests/tests-routing.module';
import { UiRapportsComponent } from './ui-rapports/ui-rapports.component';
import { RapportComponent } from './rapport/rapport.component';
import { RapportsRoutingModule } from './rapports-routing.module';



@NgModule({
  declarations: [
    TestSubmissionComponent,
    UiRapportsComponent
  ],
  imports: [
    CommonModule,
    RapportsRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule  ]
})
export class RapportsModule { }
