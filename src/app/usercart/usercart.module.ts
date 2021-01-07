import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsercartPageRoutingModule } from './usercart-routing.module';

import { UsercartPage } from './usercart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsercartPageRoutingModule
  ],
  declarations: [UsercartPage]
})
export class UsercartPageModule {}
