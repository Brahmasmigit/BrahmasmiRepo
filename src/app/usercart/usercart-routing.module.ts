import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsercartPage } from './usercart.page';

const routes: Routes = [
  {
    path: '',
    component: UsercartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsercartPageRoutingModule {}
