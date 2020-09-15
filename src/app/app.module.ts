import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
//import { dataContext } from "../app/shared/Services/datacontext.service";
import {LoginService} from "./login/login.service"
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { VendordashboardComponent } from './vendordashboard/vendordashboard.component';
import { VendorprofileComponent } from './vendorprofile/vendorprofile.component';
import { ServicedetailsComponent } from './servicedetails/servicedetails.component';
import { HomeComponent } from './home/home.component';
import { ServicelistComponent } from './servicelist/servicelist.component';
import { UserslotbookingComponent } from './userslotbooking/userslotbooking.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import {HomeService} from "./home/home.service";
import {ServiceListService} from "./servicelist/servicelist.service";
import {ServiceDetailsService} from "./servicedetails/servicedetails.service";
import {UserSlotBookingService} from "./userslotbooking/userslotbooking.service"
import {UserDashboardService} from "./userdashboard/userdashboard.service";
import {VendorDashboardService} from "./vendordashboard/vendordashboard.service";
import {EventListenerService} from "./shared/services/eventlistener.service";
import {EventModel} from "./shared/models/eventmodel";
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { AdminDashboardService } from './admin/admindashboard/admindashboard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VendordashboardComponent,
    VendorprofileComponent,
    ServicedetailsComponent,
    HomeComponent,
    ServicelistComponent,
    UserslotbookingComponent,
    UserdashboardComponent,
    AdmindashboardComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
   
  ],
  providers: [LoginService,HomeService,ServiceListService,ServiceDetailsService,UserSlotBookingService
  ,UserDashboardService,VendorDashboardService,EventListenerService,AdminDashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
