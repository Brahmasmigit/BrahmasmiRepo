import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginhomePage } from './loginhome.page';

const routes: Routes = [
  {
    path: '',
    component: LoginhomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginhomePageRoutingModule {}
