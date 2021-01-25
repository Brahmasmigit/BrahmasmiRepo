import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendordashboardPageRoutingModule } from './vendordashboard-routing.module';

import { VendordashboardPage } from './vendordashboard.page';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { VendorDashboardService } from './vendordashboard.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendordashboardPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCeA6ad2qsS-zSHDjdQX6qnuEbLQzsfDC0'
    }),
    AgmDirectionModule
  ],
  declarations: [VendordashboardPage],
  providers: [VendorDashboardService]
})
export class VendordashboardPageModule {}
