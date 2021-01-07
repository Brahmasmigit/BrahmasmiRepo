import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicetypePageRoutingModule } from './servicetype-routing.module';
import{ServiceType} from '../servicetype/servicetype.service';
import { ServicetypePage } from './servicetype.page';
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from '@angular/router';  

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicetypePageRoutingModule,
    HttpClientModule
  ],
  declarations: [ServicetypePage],
  providers: [ServiceType]
})
export class ServicetypePageModule {}
