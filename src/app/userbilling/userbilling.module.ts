import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserbillingPageRoutingModule } from './userbilling-routing.module';

import { UserbillingPage } from './userbilling.page';
import { HttpClientModule } from "@angular/common/http";
import { UserBillingService } from './userbilling.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserbillingPageRoutingModule,
    HttpClientModule
  ],
  declarations: [UserbillingPage],
  providers: [UserBillingService]
})
export class UserbillingPageModule {}
