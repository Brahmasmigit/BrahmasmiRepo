import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserslotbookingPageRoutingModule } from './userslotbooking-routing.module';

import { UserslotbookingPage } from './userslotbooking.page';
import { HttpClientModule } from "@angular/common/http";
import { UserSlotBookingService } from './userslotbooking.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserslotbookingPageRoutingModule
  ],
  declarations: [UserslotbookingPage],
  providers: [UserSlotBookingService]
})
export class UserslotbookingPageModule {}
