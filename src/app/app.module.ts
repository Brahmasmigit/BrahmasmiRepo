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
import { VendorlocationComponent } from './vendorlocation/vendorlocation.component';
import {VendorLocationService} from './vendorlocation/vendorlocation.service';
import {AgmMap,MapsAPILoader  } from '@agm/core';
import { AgmCoreModule } from '@agm/core';
import { CartComponent } from './cart/cart.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { VendorcityComponent } from './vendorcity/vendorcity.component';
import { VendorCityService } from './vendorcity/vendorcity.service';
import { AdminservicetypeComponent } from './adminservicetype/adminservicetype.component';
import { AdminservicedetailsComponent } from './adminservicedetails/adminservicedetails.component';
import {AdminServiceTypeService} from './adminservicetype/adminservicetype.service';
import {AdminServiceDetailsService} from './adminservicedetails/adminservicedetails.service';
import {QuillModule} from 'ngx-quill';
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';
import {AdminLoginService} from './admin/adminlogin/adminlogin.service';
import {WindowRefService} from './shared/services/windowref.service';
import { ZoomuserComponent } from './zoomuser/zoomuser.component';
import { AdminmeetingComponent } from './admin/adminmeeting/adminmeeting.component';
import {AdminMeetingService} from './admin/adminmeeting/adminmeeting.service';
import { ProductsComponent } from './products/products.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import {ProductDetailsService} from './productdetails/productdetails.service';
import{ProductService} from './products/products.service';
import { StoreregistrationComponent } from './storeregistration/storeregistration.component';
import {StoreRegistrationService} from './storeregistration/storeregistration.service';
import { AstrologySlotbookingComponent } from './astrologyslotbooking/astrologyslotbooking.component';
import {AstrologySlotBookingService} from './astrologyslotbooking/astrologyslotbooking.service';
import { StoredashboardComponent } from './storedashboard/storedashboard.component';
import { StockentryComponent } from './stockentry/stockentry.component';
import {StockEntryService} from './stockentry/stockentry.service';
import {StoreDashboardService} from './storedashboard/storedashboard.service';
import { UserproductorderdetailsComponent } from './userproductorderdetails/userproductorderdetails.component';
import{UserProductOrderDetailsService} from './userproductorderdetails/userproductorderdetails.service';
import { AdminproductdashboardComponent } from './admin/adminproductdashboard/adminproductdashboard.component';
import {AdminProductDashboardService} from './admin/adminproductdashboard/adminproductdashboard.service';
import { AdminheaderComponent } from './shared/components/adminheader/adminheader.component';
import { StoreheaderComponent } from './shared/components/storeheader/storeheader.component';
import { VirtualvideoslotbookingComponent } from './virtualvideoslotbooking/virtualvideoslotbooking.component';
import {VirtualVideoSlotBookingService} from './virtualvideoslotbooking/virtualvideoslotbooking.service';
import { EnquiryheaderComponent } from './shared/components/enquiryheader/enquiryheader.component';
import { ConstructionComponent } from './construction/construction.component';
import { AdmintempleservicesComponent } from './admin/admintempleservices/admintempleservices.component';
import { TempleService } from './admin/admintempleservices/templeService.services';
import { VendorsearchComponent } from './vendorsearch/vendorsearch.component';
import {VendorSearchService} from './vendorsearch/vendorsearch.service';
import { VendorbookingComponent } from './vendorbooking/vendorbooking.component';
import {VendorBookingService} from './vendorbooking/vendorbooking.service';
import { ProductcategoriesComponent } from './productcategories/productcategories.component';
import {ProductCategoriesService} from './productcategories/productcategories.service';
import { TempleservicesComponent } from './templeservices/templeservices.component';
import { TempleDetailsComponent } from './templeservices/temple-details/temple-details.component';
import {TempleservicesService} from './templeservices/templeservices.service';
import { AdmincouponComponent } from './admin/admincoupon/admincoupon.component';
import {AdminCouponService} from './admin/admincoupon/admincoupon.service';
import { AdminloyaltypointsComponent } from './admin/adminloyaltypoints/adminloyaltypoints.component';
import {AdminLoyaltyPointsService} from './admin/adminloyaltypoints/adminloyaltypoints.service';
import { DatePipe } from '@angular/common';
import { VendormapComponent } from './vendormap/vendormap.component';
import { VendorpaymentComponent } from './vendorpayment/vendorpayment.component';

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
    VendorEnquiryComponent,
    VendorlocationComponent,
    CartComponent,
    HeaderComponent,
    FooterComponent,
    VendorcityComponent,
    AdminservicetypeComponent,
    AdminservicedetailsComponent,
    AdminloginComponent,
    ZoomuserComponent,
    AdminmeetingComponent,
    ProductsComponent,
    ProductdetailsComponent,
    StoreregistrationComponent,
    AstrologySlotbookingComponent,
    StoredashboardComponent,
    StockentryComponent,
    UserproductorderdetailsComponent,
    AdminproductdashboardComponent,
    AdminheaderComponent,
    StoreheaderComponent,
    VirtualvideoslotbookingComponent,
    EnquiryheaderComponent,
    ConstructionComponent,
    AdmintempleservicesComponent,
    VendorsearchComponent,
    VendorbookingComponent,
    ProductcategoriesComponent,
    TempleservicesComponent,
    TempleDetailsComponent,
    AdmincouponComponent,
    AdminloyaltypointsComponent,
    VendormapComponent,
    VendorpaymentComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    NgOtpInputModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCeA6ad2qsS-zSHDjdQX6qnuEbLQzsfDC0',
      libraries: ['geometry','places']
    }),
    QuillModule.forRoot()

  ],
  providers: [LoginService,HomeService,ServiceListService,ServiceDetailsService,UserSlotBookingService
  ,UserDashboardService,VendorDashboardService,EventListenerService,AdminDashboardService,PackageService,
  ToastService,UserBillingService,OrderDetailsService,VendorRegistrationService,UserProfileService,UtilitiesService,
  VendorEnquiryService,VendorLocationService,VendorCityService,AdminServiceTypeService,AdminServiceDetailsService,
  AdminLoginService,WindowRefService,AdminMeetingService,ProductService,ProductDetailsService,StoreRegistrationService,
  AstrologySlotBookingService,StockEntryService,StoreDashboardService,UserProductOrderDetailsService,AdminProductDashboardService,
  VirtualVideoSlotBookingService,TempleService,VendorSearchService,VendorBookingService,ProductCategoriesService,TempleservicesService,
  AdminCouponService,AdminLoyaltyPointsService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
