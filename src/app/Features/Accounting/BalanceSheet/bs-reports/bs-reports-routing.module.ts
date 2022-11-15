import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BsReportsComponent } from './bs-reports.component';

const routes: Routes = [{ path: '', component: BsReportsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BsReportsRoutingModule { }
