import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserslotbookingPage } from './userslotbooking.page';

const routes: Routes = [
  {
    path: '',
    component: UserslotbookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserslotbookingPageRoutingModule {}
