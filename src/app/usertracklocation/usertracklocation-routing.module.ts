import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsertracklocationPage } from './usertracklocation.page';

const routes: Routes = [
  {
    path: '',
    component: UsertracklocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsertracklocationPageRoutingModule {}
