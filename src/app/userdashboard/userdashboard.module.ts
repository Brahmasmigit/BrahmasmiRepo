import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserdashboardPageRoutingModule } from './userdashboard-routing.module';

import { UserdashboardPage } from './userdashboard.page';
import {UserDashboardService} from './userdashboard.service';
import {VendorDashboardService} from '../vendordashboard/vendordashboard.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserdashboardPageRoutingModule
  ],
  declarations: [UserdashboardPage],
  providers: [UserDashboardService,VendorDashboardService]
})
export class UserdashboardPageModule {}
