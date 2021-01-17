import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorsearchmapPage } from './vendorsearchmap.page';

const routes: Routes = [
  {
    path: '',
    component: VendorsearchmapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorsearchmapPageRoutingModule {}
