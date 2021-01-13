import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { VendordashboardComponent } from './vendordashboard/vendordashboard.component';
import { VendorprofileComponent } from './vendorprofile/vendorprofile.component';
import { ServicedetailsComponent } from './servicedetails/servicedetails.component';
import { HomeComponent } from './home/home.component';
import { ServicelistComponent } from './servicelist/servicelist.component';
import { UserslotbookingComponent } from './userslotbooking/userslotbooking.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { LoginComponent } from './login/login.component';
import {AdmindashboardComponent} from './admin/admindashboard/admindashboard.component';
import {PackageComponent} from './package/package.component';
import {UserbillingComponent} from './userbilling/userbilling.component';
import {UsercartComponent} from './usercart/usercart.component';
import {OrderdetailsComponent} from './orderdetails/orderdetails.component';
import {VendorRegistrationComponent} from './vendorregistration/vendorregistration.component';
import {UserprofileComponent} from './userprofile/userprofile.component';
import {AdminvendorenquiryComponent} from './admin/adminvendorenquiry/adminvendorenquiry.component';
import {VendorEnquiryComponent} from './vendorenquiry/vendorenquiry.component';
import { VendorlocationComponent } from './vendorlocation/vendorlocation.component';
import { VendorcityComponent } from './vendorcity/vendorcity.component';
import { AdminservicetypeComponent } from './adminservicetype/adminservicetype.component';
import { AdminservicedetailsComponent } from './adminservicedetails/adminservicedetails.component';
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';
import { ZoomuserComponent } from './zoomuser/zoomuser.component';
import { AdminmeetingComponent } from './admin/adminmeeting/adminmeeting.component';
import { ProductsComponent } from './products/products.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { StoreregistrationComponent } from './storeregistration/storeregistration.component';
import { AstrologySlotbookingComponent } from './astrologyslotbooking/astrologyslotbooking.component';
import { StockentryComponent } from './stockentry/stockentry.component';
import { StoredashboardComponent } from './storedashboard/storedashboard.component';
import { UserproductorderdetailsComponent } from './userproductorderdetails/userproductorderdetails.component';
import { AdminproductdashboardComponent } from './admin/adminproductdashboard/adminproductdashboard.component';
import { VirtualvideoslotbookingComponent } from './virtualvideoslotbooking/virtualvideoslotbooking.component';
import { ConstructionComponent } from './construction/construction.component';
import { VendorsearchComponent } from './vendorsearch/vendorsearch.component';
import { VendorbookingComponent } from './vendorbooking/vendorbooking.component';
import { ProductcategoriesComponent } from './productcategories/productcategories.component';
import { AdmincouponComponent } from './admin/admincoupon/admincoupon.component';
import { AdminloyaltypointsComponent } from './admin/adminloyaltypoints/adminloyaltypoints.component';
import { VendormapComponent } from './vendormap/vendormap.component';
import { VendorpaymentComponent } from './vendorpayment/vendorpayment.component';
import { TestmapComponent } from './testmap/testmap.component';
import { MainComponent } from './main/main.component';
import { AuspiciousdatesComponent } from './auspiciousdates/auspiciousdates.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { TermsandconditionsComponent } from './termsandconditions/termsandconditions.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ProductmasterComponent } from './admin/productmaster/productmaster.component';
import { HoroscopeComponent } from './horoscope/horoscope.component';
import { HoroscopedetailsComponent } from './horoscopedetails/horoscopedetails.component';
import { HoroscopemasterComponent } from './admin/horoscopemaster/horoscopemaster.component';
import { AdmintempleservicesComponent } from './admin/admintempleservices/admintempleservices.component';
import { TempleservicesComponent } from './templeservices/templeservices.component';
import { TempleDetailsComponent } from './templeservices/temple-details/temple-details.component';
import { ManagetempleservicerequestsComponent } from './admin/admintempleservices/managetempleservicerequests/managetempleservicerequests.component';
import { TempleUserCartComponent } from './templeservices/templeusercart/templeusercart.component';
import { TempleUserBillingComponent } from './templeservices/templeuserbilling/templeuserbilling.component';
import { TempleOrderDetailsComponent } from './templeservices/templeorderdetails/templeorderdetails.component';
import { TempleUserDashboardComponent } from './templeservices/templeuserdashboard/templeuserdashboard.component';
import {HomepageComponent} from './homepage/homepage.component';
import { HowweworkComponent } from './howwework/howwework.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { CancellationComponent } from './cancellation/cancellation.component';
import { adminspecialservicesenquiryComponent } from './adminspecialservicesenquiry/adminspecialservicesenquiry.component';
import { SpecialservicesenquiryComponent } from './specialservicesenquiry/specialservicesenquiry.component';
import { FaqComponent } from './faq/faq.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { AdminonboardingComponent } from './adminonboarding/adminonboarding.component';
import { BlogComponent } from './blog/blog.component';
import { AdminblogComponent } from './adminblog/adminblog.component';
import { BlogdetailsComponent } from './blogdetails/blogdetails.component';

import { ConcernenquiryComponent } from './concernenquiry/concernenquiry.component';
import { admincommunityservicesComponent } from './admincommunityservices/admincommunityservices.component';
import { CommunityServicesComponent } from './communityservices/communityservices.component';

import { adminpoojasubscriptionformComponent } from './adminpoojasubscriptionform/adminpoojasubscriptionform.component';
import { poojasubscriptionformComponent } from './poojasubscriptionform/poojasubscriptionform.component';
import { UploadvendorphotoComponent } from './uploadvendorphoto/uploadvendorphoto.component';
import { ProductservicemappingComponent } from './productservicemapping/productservicemapping.component';
import {GalleryComponent} from './gallery/gallery.component';
import {CorporateaddressComponent} from './corporateaddress/corporateaddress.component';
import {GetaddressfromlatlngComponent} from './getaddressfromlatlng/getaddressfromlatlng.component';
import {PriestpreferenceComponent} from './priestpreference/priestpreference.component';
import {EventsComponent} from './events/events.component';
import {AboutbrahmasmiComponent} from './aboutbrahmasmi/aboutbrahmasmi.component';
import { adminconcernenquiryComponent } from './adminconcernenquiry/adminconcernenquiry.component';
import {VendorSearchMapComponent} from './vendorsearchmap/vendorsearchmap.component';
import {VendordetailsComponent} from './vendordetails/vendordetails.component';
import {PressreleaseComponent} from './pressrelease/pressrelease.component';

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'vendordashboard', component: VendordashboardComponent },
  { path: 'vendorprofile', component: VendorprofileComponent },
  { path: 'servicedetails/:serviceId', component: ServicedetailsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'servicelist/:servicetypeId/:cityId', component: ServicelistComponent,pathMatch: 'full' },
  { path: 'servicelist/:servicetypeId/:cityId/:languageName', component: ServicelistComponent,pathMatch: 'full' },
  { path: 'servicelist/:serviceId/:servicetypeId/:cityId/:languageName', component: ServicelistComponent,pathMatch: 'full' },
  { path: 'userslotbooking', component: UserslotbookingComponent },
  { path: 'package/:serviceId/:serviceTypeId/:vendorId', component: PackageComponent },
  //{ path: 'package/:serviceId/:serviceTypeId/:vendorId/:languageName/:cityId', component: PackageComponent },
  { path: 'package/:serviceTypeId/:serviceId/:vendorId/:cityId/:languageName', component: PackageComponent },
  { path: 'package/:serviceTypeId/:serviceId/:cityId/:languageName', component: PackageComponent },
  { path: 'userdashboard', component: UserdashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admindashboard', component: AdmindashboardComponent },
  { path: 'userbilling', component: UserbillingComponent },
  {path:'usercart', component: UsercartComponent},
  {path:'orderdetails', component: OrderdetailsComponent},
  // {path:'vendorregistration', component: VendorRegistrationComponent},
  {path:'panditregistration', component: VendorRegistrationComponent},
  {path:'userprofile', component: UserprofileComponent},
  {path:'adminvendorenquiry', component: AdminvendorenquiryComponent},
  {path:'vendorenquiry', component: VendorEnquiryComponent},
  {path:'vendorlocation', component: VendorlocationComponent},
  {path:'vendorcity', component: VendorcityComponent },
  {path:'adminservicetype', component: AdminservicetypeComponent},
  {path:'adminservicedetails', component: AdminservicedetailsComponent},
  {path:'adminlogin', component: AdminloginComponent},
  {path:'zoomuser', component: ZoomuserComponent},
  {path:'adminmeeting',component: AdminmeetingComponent},
  {path:'products/:productCategoryID', component: ProductsComponent},
  {path:'productdetails/:productID',component: ProductdetailsComponent},
  {path:'storeregistration',component: StoreregistrationComponent},
  {path:'astrologyslotbooking',component: AstrologySlotbookingComponent},
  {path:'stockentry',component: StockentryComponent},
  {path:'storedashboard',component: StoredashboardComponent},
  {path:'userproductorders',component: UserproductorderdetailsComponent},
  {path:'adminproductdashboard',component: AdminproductdashboardComponent},
  {path:'virtualslotbooking',component: VirtualvideoslotbookingComponent},
  {path:'construction',component: ConstructionComponent},
  {path: 'vendorsearch', component: VendorsearchComponent },
  {path: 'vendorbooking', component: VendorbookingComponent },
  {path: 'productcategories', component: ProductcategoriesComponent },
  {path: 'admincoupon', component: AdmincouponComponent },
  {path: 'adminloyaltypoints', component: AdminloyaltypointsComponent },
  {path: 'vendormap', component: VendormapComponent },
  {path: 'vendorpayment', component: VendorpaymentComponent },
  {path: 'testmap', component: TestmapComponent },
  {path: 'main', component: MainComponent },
  {path: 'auspicious/:auspicious', component: AuspiciousdatesComponent },
  {path: 'aboutus', component: AboutusComponent },
  {path: 'terms', component: TermsandconditionsComponent },
  {path: 'contactus', component: ContactusComponent },
  {path: 'productmaster', component: ProductmasterComponent },
  {path: 'horoscope', component: HoroscopeComponent },
  {path: 'horoscopedetails/:horoscopeID', component: HoroscopedetailsComponent },
  {path: 'horoscopemaster', component: HoroscopemasterComponent },
  { path: 'admintempleservices', component: AdmintempleservicesComponent },
  { path: 'templeservices', component: TempleservicesComponent },
  { path: 'temple-details', component: TempleDetailsComponent },
  { path: 'managetempleservicerequest', component: ManagetempleservicerequestsComponent },
  { path: 'templeserviceusercart', component: TempleUserCartComponent },
  { path: 'templeuserbilling', component: TempleUserBillingComponent },
  { path: 'templeorderdetails', component: TempleOrderDetailsComponent },
  { path: 'tempeuserdashboard', component: TempleUserDashboardComponent },
  {path:'homepage',component:HomepageComponent},
  {path:'howwework',component:HowweworkComponent},
  {path:'privacypolicy',component:PrivacypolicyComponent},
  {path:'cancellation',component:CancellationComponent},
  {path:'faq',component:FaqComponent},
  {path:'adminspecialservicesenquiry',component:adminspecialservicesenquiryComponent},
  {path:'specialservicesenquiry', component:SpecialservicesenquiryComponent},
  {path:'vedapatashalaonboarding',component:OnboardingComponent},
  {path:'adminonboarding',component:AdminonboardingComponent},
  { path: 'adminblog', component: AdminblogComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blogdetails/:blogID', component: BlogdetailsComponent },
  {path:'concernenquiry',component:ConcernenquiryComponent},
  {path:'admincommunityservices',component:admincommunityservicesComponent},
  {path:'communityservices',component:CommunityServicesComponent},
  {path:'poojasubscriptionform',component:poojasubscriptionformComponent},
  {path:'adminpoojasubscriptionform',component:adminpoojasubscriptionformComponent},
  {path:'uploadvendorphoto', component:UploadvendorphotoComponent},
  {path:'vendorprofile/:vendorId',component:VendorprofileComponent},
  {path:'productservicemapping',component:ProductservicemappingComponent},
  {path:'gallery',component:GalleryComponent},
  {path:'corporateaddress',component:CorporateaddressComponent},
  {path:'getaddress',component:GetaddressfromlatlngComponent},
  {path:'priestpreference/:serviceId',component:PriestpreferenceComponent},
  { path: 'servicedetails/:servicetypeId/:serviceId/:cityId/:languageName', component: ServicedetailsComponent },
  { path: 'servicedetails/:serviceId/:cityId/:languageName', component: ServicedetailsComponent },
  {path:'events',component:EventsComponent},
  {path:'aboutbrahmasmi',component:AboutbrahmasmiComponent},
  {path:'adminconcernenquiry',component:adminconcernenquiryComponent},
  { path: 'bookpanditmap', component: VendorSearchMapComponent },
  {path:'vendordetails',component:VendordetailsComponent},
  {path:'pressrelease',component:PressreleaseComponent},
  { path:'bookpanditmap/:servicetypeId/:serviceId/:cityId/:languageName', component: VendorSearchMapComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes),NgbModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
