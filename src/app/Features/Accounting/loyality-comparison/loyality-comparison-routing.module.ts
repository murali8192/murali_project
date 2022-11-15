import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoyalityComparisonComponent } from './loyality-comparison.component';

const routes: Routes = [{ path: '', component: LoyalityComparisonComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoyalityComparisonRoutingModule { }
