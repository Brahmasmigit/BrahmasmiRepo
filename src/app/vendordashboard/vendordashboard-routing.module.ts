import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendordashboardPage } from './vendordashboard.page';

const routes: Routes = [
  {
    path: '',
    component: VendordashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendordashboardPageRoutingModule {}
