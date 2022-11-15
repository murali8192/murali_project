import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FsDetailsComponent } from './fs-details.component';

const routes: Routes = [{ path: '', component: FsDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FsDetailsRoutingModule { }
