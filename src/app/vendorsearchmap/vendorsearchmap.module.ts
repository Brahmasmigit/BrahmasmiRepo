import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorsearchmapPageRoutingModule } from './vendorsearchmap-routing.module';

import { VendorsearchmapPage } from './vendorsearchmap.page';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorsearchmapPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCeA6ad2qsS-zSHDjdQX6qnuEbLQzsfDC0'
    }),
    AgmDirectionModule
  ],
  declarations: [VendorsearchmapPage]
})
export class VendorsearchmapPageModule {}
