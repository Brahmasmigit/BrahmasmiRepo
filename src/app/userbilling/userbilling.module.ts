import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserbillingPageRoutingModule } from './userbilling-routing.module';

import { UserbillingPage } from './userbilling.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserbillingPageRoutingModule
  ],
  declarations: [UserbillingPage]
})
export class UserbillingPageModule {}
