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
import { VendorsearchComponent } from './vendorsearch/vendorsearch.component';
import {VendorSearchService} from './vendorsearch/vendorsearch.service';
import { VendorbookingComponent } from './vendorbooking/vendorbooking.component';
import {VendorBookingService} from './vendorbooking/vendorbooking.service';
import { ProductcategoriesComponent } from './productcategories/productcategories.component';
import {ProductCategoriesService} from './productcategories/productcategories.service';
import {TempleservicesService} from './templeservices/templeservices.service';
import { AdmincouponComponent } from './admin/admincoupon/admincoupon.component';
import {AdminCouponService} from './admin/admincoupon/admincoupon.service';
import { AdminloyaltypointsComponent } from './admin/adminloyaltypoints/adminloyaltypoints.component';
import {AdminLoyaltyPointsService} from './admin/adminloyaltypoints/adminloyaltypoints.service';
import { DatePipe } from '@angular/common';
import { VendormapComponent } from './vendormap/vendormap.component';
import { VendorpaymentComponent } from './vendorpayment/vendorpayment.component';
import { TestmapComponent } from './testmap/testmap.component';
import { MainComponent } from './main/main.component';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import { AuspiciousdatesComponent } from './auspiciousdates/auspiciousdates.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { TermsandconditionsComponent } from './termsandconditions/termsandconditions.component';
import { ContactusComponent } from './contactus/contactus.component';
import {ContactUsService} from './contactus/contactus.service';
import { ProductmasterComponent } from './admin/productmaster/productmaster.component';
import {ProductMasterService} from './admin/productmaster/productmaster.service';
import { HoroscopeComponent } from './horoscope/horoscope.component';
import { HoroscopedetailsComponent } from './horoscopedetails/horoscopedetails.component';
import { HoroscopemasterComponent } from './admin/horoscopemaster/horoscopemaster.component';
import { HoroscopeService } from './horoscope/horoscope.service';
import { HoroscopeDetailsService } from './horoscopedetails/horoscopedetails.service';
import { HoroscopeMasterService } from './admin/horoscopemaster/horoscopemaster.service';
import { TempleAdminService } from './admin/admintempleservices/templeAdminService.services';
import { TempleservicesComponent } from './templeservices/templeservices.component';
import { TempleService } from './templeservices/templeService.service';
import { TempleDetailsComponent } from './templeservices/temple-details/temple-details.component';
import { ManagetempleservicerequestsComponent } from './admin/admintempleservices/managetempleservicerequests/managetempleservicerequests.component';
import { TempleUserCartComponent } from './templeservices/templeusercart/templeusercart.component';
import { TempleUserBillingComponent } from './templeservices/templeuserbilling/templeuserbilling.component';
import { TempleUserBillingService } from './templeservices/templeuserbilling/templeuserbilling.service';
import { TempleOrderDetailsComponent } from './templeservices/templeorderdetails/templeorderdetails.component';
import { TempleOrderDetailsService } from './templeservices/templeorderdetails/templeorderdetails.service';
import { TempleUserDashboardComponent } from './templeservices/templeuserdashboard/templeuserdashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RouterModule } from '@angular/router';
import { HowweworkComponent } from './howwework/howwework.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { FaqComponent } from './faq/faq.component';
import { CancellationComponent } from './cancellation/cancellation.component';
import {adminspecialservicesenquiryComponent} from './adminspecialservicesenquiry/adminspecialservicesenquiry.component';
import { SpecialservicesenquiryComponent } from './specialservicesenquiry/specialservicesenquiry.component';
import { SpecialServicesEnquiryService } from './specialservicesenquiry/specialservicesenquiry.service';
import { adminspecialservicesenquiryService } from './adminspecialservicesenquiry/adminspecialservicesenquiry.service';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { AdminonboardingComponent } from './adminonboarding/adminonboarding.component';
import { adminOnBoardingService } from './adminonboarding/adminonboarding.service';
import { OnBoardingService } from './onboarding/onboarding.service';
import { AdminblogComponent } from './adminblog/adminblog.component';
import { BlogComponent } from './blog/blog.component';
import { BlogdetailsComponent } from './blogdetails/blogdetails.component';
import { AdminBlogService } from './adminblog/adminblog.service';
import { ConcernenquiryComponent } from './concernenquiry/concernenquiry.component';
import { ConcernEnquiryService } from './concernenquiry/ConcernEnquiry.service';
import { CommunityServicesComponent } from './communityservices/communityservices.component';
import { admincommunityservicesComponent } from './admincommunityservices/admincommunityservices.component';
import { admincommunityservicesService } from './admincommunityservices/admincommunityservices.service';
import { CommunityServicesService } from './communityservices/CommunityServices.service';
import { adminpoojasubscriptionformComponent } from './adminpoojasubscriptionform/adminpoojasubscriptionform.component';
import { poojasubscriptionformComponent } from './poojasubscriptionform/poojasubscriptionform.component';
import { poojasubscriptionformService } from './poojasubscriptionform/poojasubscriptionform.service';
import { adminpoojasubscriptionformService } from './adminpoojasubscriptionform/adminpoojasubscriptionform.service';
import { TempleServicesMultiSelectDropdownComponent } from './templeservices/temple-services-multi-select-dropdown/temple-services-multi-select-dropdown.component';
import { AccommodationMultiSelectDownComponent } from './templeservices/accommodation-multi-select-down/accommodation-multi-select-down.component';

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
    VendorpaymentComponent,
    TestmapComponent,
    MainComponent,
    AuspiciousdatesComponent,
    AboutusComponent,
    TermsandconditionsComponent,
    ContactusComponent,
    ProductmasterComponent,
    HoroscopeComponent,
    HoroscopedetailsComponent,
    HoroscopemasterComponent,
    TempleservicesComponent,
    TempleDetailsComponent,
    ManagetempleservicerequestsComponent,
    TempleUserCartComponent,
    TempleUserBillingComponent,
    TempleOrderDetailsComponent,
    TempleUserDashboardComponent,
    HomepageComponent,
    HowweworkComponent,
    PrivacypolicyComponent,
    FaqComponent,
    CancellationComponent,
    adminspecialservicesenquiryComponent,
    SpecialservicesenquiryComponent,
    OnboardingComponent,
    AdminonboardingComponent,
    AdminblogComponent,
    BlogComponent,
    BlogdetailsComponent,
    ConcernenquiryComponent,
    CommunityServicesComponent,
    admincommunityservicesComponent,
    adminpoojasubscriptionformComponent,
    poojasubscriptionformComponent,
    TempleServicesMultiSelectDropdownComponent,
    AccommodationMultiSelectDownComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    NgOtpInputModule,
    RouterModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCeA6ad2qsS-zSHDjdQX6qnuEbLQzsfDC0',
      libraries: ['geometry','places']
    }),
    QuillModule.forRoot(),
    SlickCarouselModule

  ],
  providers: [LoginService,HomeService,ServiceListService,ServiceDetailsService,UserSlotBookingService
  ,UserDashboardService,VendorDashboardService,EventListenerService,AdminDashboardService,PackageService,
  ToastService,UserBillingService,OrderDetailsService,VendorRegistrationService,UserProfileService,UtilitiesService,
  VendorEnquiryService,VendorLocationService,VendorCityService,AdminServiceTypeService,AdminServiceDetailsService,
  AdminLoginService,WindowRefService,AdminMeetingService,ProductService,ProductDetailsService,StoreRegistrationService,
  AstrologySlotBookingService,StockEntryService,StoreDashboardService,UserProductOrderDetailsService,AdminProductDashboardService,
  VirtualVideoSlotBookingService,VendorSearchService,VendorBookingService,ProductCategoriesService,TempleservicesService,
  AdminCouponService,AdminLoyaltyPointsService,DatePipe,ContactUsService,ProductMasterService,HoroscopeService,HoroscopeDetailsService,
  HoroscopeMasterService,TempleAdminService, TempleService, TempleUserBillingService,TempleOrderDetailsService,SpecialServicesEnquiryService
,adminspecialservicesenquiryService,adminOnBoardingService,OnBoardingService,AdminBlogService,ConcernEnquiryService,admincommunityservicesService
,CommunityServicesService,poojasubscriptionformService,adminpoojasubscriptionformService],
  bootstrap: [AppComponent]
})
export class AppModule { }
