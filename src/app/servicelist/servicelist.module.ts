import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicelistPageRoutingModule } from './servicelist-routing.module';

import { ServicelistPage } from './servicelist.page';

import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from '@angular/router';  
import{ServiceListService} from '../servicelist/servicelist.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ServicelistPageRoutingModule
  ],
  declarations: [ServicelistPage],
  providers: [ServiceListService]
})
export class ServicelistPageModule {}
