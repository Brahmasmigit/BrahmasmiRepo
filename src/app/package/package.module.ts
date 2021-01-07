import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PackagePageRoutingModule } from './package-routing.module';

import { PackagePage } from './package.page';
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from '@angular/router';  
import { PackageService } from './package.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PackagePageRoutingModule,
    HttpClientModule
  ],
  declarations: [PackagePage],
  providers: [PackageService]
})
export class PackagePageModule {}
