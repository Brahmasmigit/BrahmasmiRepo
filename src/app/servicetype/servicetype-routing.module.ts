import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicetypePage } from './servicetype.page';

const routes: Routes = [
  {
    path: '',
    component: ServicetypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicetypePageRoutingModule {}
