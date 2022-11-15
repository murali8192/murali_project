import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FsReportsComponent } from './fs-reports.component';

const routes: Routes = [{ path: '', component: FsReportsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FsReportsRoutingModule { }
