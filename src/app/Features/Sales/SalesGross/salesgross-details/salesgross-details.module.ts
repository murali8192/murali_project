import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesgrossDetailsRoutingModule } from './salesgross-details-routing.module';
import { SalesgrossDetailsComponent } from './salesgross-details.component';


@NgModule({
  declarations: [SalesgrossDetailsComponent],
  imports: [
    CommonModule,
    SalesgrossDetailsRoutingModule
  ]
})
export class SalesgrossDetailsModule { }
