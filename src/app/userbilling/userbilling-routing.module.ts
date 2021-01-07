import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserbillingPage } from './userbilling.page';

const routes: Routes = [
  {
    path: '',
    component: UserbillingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserbillingPageRoutingModule {}
