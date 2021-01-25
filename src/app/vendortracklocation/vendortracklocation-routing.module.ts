import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendortracklocationPage } from './vendortracklocation.page';

const routes: Routes = [
  {
    path: '',
    component: VendortracklocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendortracklocationPageRoutingModule {}
