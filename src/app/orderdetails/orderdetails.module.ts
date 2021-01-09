import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderdetailsPageRoutingModule } from './orderdetails-routing.module';

import { OrderdetailsPage } from './orderdetails.page';
import { HttpClientModule } from "@angular/common/http";
import { OrderDetailsService } from './orderdetails.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderdetailsPageRoutingModule
  ],
  declarations: [OrderdetailsPage],
  providers: [OrderDetailsService]
})
export class OrderdetailsPageModule {}
