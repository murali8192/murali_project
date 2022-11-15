import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FsDetailsRoutingModule } from './fs-details-routing.module';
import { FsDetailsComponent } from './fs-details.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import {FsReportsModule} from '../fs-reports/fs-reports.module'

@NgModule({
  declarations: [FsDetailsComponent],
  imports: [
    CommonModule,
    FsDetailsRoutingModule,
    NgxSpinnerModule,
    FsReportsModule
  ]
})
export class FsDetailsModule { }
