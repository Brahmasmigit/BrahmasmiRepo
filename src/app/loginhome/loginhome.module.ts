import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginhomePageRoutingModule } from './loginhome-routing.module';

import { LoginhomePage } from './loginhome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginhomePageRoutingModule
  ],
  declarations: [LoginhomePage]
})
export class LoginhomePageModule {}
