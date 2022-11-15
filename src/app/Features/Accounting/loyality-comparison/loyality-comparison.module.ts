import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoyalityComparisonRoutingModule } from './loyality-comparison-routing.module';
import { LoyalityComparisonComponent } from './loyality-comparison.component';


@NgModule({
  declarations: [LoyalityComparisonComponent],
  imports: [
    CommonModule,
    LoyalityComparisonRoutingModule
  ]
})
export class LoyalityComparisonModule { }
