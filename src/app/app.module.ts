import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgOtpInputModule } from  'ng-otp-input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
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
import {PackageComponent} from './package/package.component';
import {PackageService} from './package/package.service';
import {ToastComponent} from './shared/directives/toast.component';
import {ToastService} from './shared/services/toastservice';
import {UserbillingComponent} from './userbilling/userbilling.component';
import {UserBillingService} from './userbilling/userbilling.service';
import {UsercartComponent} from './usercart/usercart.component';
import {OrderdetailsComponent} from './orderdetails/orderdetails.component';
import {OrderDetailsService} from './orderdetails/orderdetails.service';
import {VendorRegistrationComponent} from './vendorregistration/vendorregistration.component';
import {UserprofileComponent} from './userprofile/userprofile.component';
import {VendorRegistrationService} from './vendorregistration/vendorregistration.service';
import {UserProfileService} from './userprofile/userprofile.service';
import {UtilitiesService} from './shared/services/utilities.service';
import {AdminvendorenquiryComponent} from './admin/adminvendorenquiry/adminvendorenquiry.component';
import {VendorEnquiryComponent} from './vendorenquiry/vendorenquiry.component';
import {VendorEnquiryService} from './vendorenquiry/vendorenquiry.service';



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
    AdmindashboardComponent,
    PackageComponent,
    ToastComponent,
    UserbillingComponent,
    UsercartComponent,
    OrderdetailsComponent,
    VendorRegistrationComponent,
    UserprofileComponent,
    AdminvendorenquiryComponent,
    VendorEnquiryComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    NgOtpInputModule

  ],
  providers: [LoginService,HomeService,ServiceListService,ServiceDetailsService,UserSlotBookingService
  ,UserDashboardService,VendorDashboardService,EventListenerService,AdminDashboardService,PackageService,
  ToastService,UserBillingService,OrderDetailsService,VendorRegistrationService,UserProfileService,UtilitiesService,
  VendorEnquiryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
