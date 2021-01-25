import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsertracklocationPageRoutingModule } from './usertracklocation-routing.module';

import { UsertracklocationPage } from './usertracklocation.page';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import {UserTrackLocationService} from './usertracklocation.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsertracklocationPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCeA6ad2qsS-zSHDjdQX6qnuEbLQzsfDC0'
    }),
    AgmDirectionModule
  ],
  declarations: [UsertracklocationPage],
  providers: [UserTrackLocationService]
})
export class UsertracklocationPageModule {}
