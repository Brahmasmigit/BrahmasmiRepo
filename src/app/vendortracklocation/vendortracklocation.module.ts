import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendortracklocationPageRoutingModule } from './vendortracklocation-routing.module';

import { VendortracklocationPage } from './vendortracklocation.page';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import {VendorTrackLocationService} from './vendortracklocation.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendortracklocationPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCeA6ad2qsS-zSHDjdQX6qnuEbLQzsfDC0'
    }),
    AgmDirectionModule
  ],
  declarations: [VendortracklocationPage],
  providers: [VendorTrackLocationService]
})
export class VendortracklocationPageModule {}
