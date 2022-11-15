import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScDetailsRoutingModule } from './sc-details-routing.module';
import { ScDetailsComponent } from './sc-details.component';


@NgModule({
  declarations: [ScDetailsComponent],
  imports: [
    CommonModule,
    ScDetailsRoutingModule
  ]
})
export class ScDetailsModule { }
