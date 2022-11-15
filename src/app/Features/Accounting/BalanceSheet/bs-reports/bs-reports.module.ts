import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsReportsRoutingModule } from './bs-reports-routing.module';
import { BsReportsComponent } from './bs-reports.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IgxCalendarModule, IgxCardModule, IgxInputGroupModule, IgxSelectModule } from 'igniteui-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [BsReportsComponent],
  imports: [
    CommonModule,
    BsReportsRoutingModule,
    FormsModule,
    ReactiveFormsModule,BsDatepickerModule.forRoot(),
    NgbModule,
    IgxCalendarModule,
    IgxSelectModule,
    IgxCardModule,
    IgxInputGroupModule,
  NgMultiSelectDropDownModule.forRoot(),
  ],
  providers:[NgbActiveModal]
})
export class BsReportsModule { }
