import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicedetailsPageRoutingModule } from './servicedetails-routing.module';

import { ServicedetailsPage } from './servicedetails.page';
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from '@angular/router';  
import{ServiceDetailsService} from '../servicedetails/servicedetails.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ServicedetailsPageRoutingModule
  ],
  declarations: [ServicedetailsPage],
  providers: [ServiceDetailsService]
})
export class ServicedetailsPageModule {}
