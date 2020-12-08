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
import { AdmintempleservicesComponent } from './admin/admintempleservices/admintempleservices.component';
import { VendorsearchComponent } from './vendorsearch/vendorsearch.component';
import { VendorbookingComponent } from './vendorbooking/vendorbooking.component';
import { ProductcategoriesComponent } from './productcategories/productcategories.component';
import { TempleservicesComponent } from './templeservices/templeservices.component';
import { TempleDetailsComponent } from './templeservices/temple-details/temple-details.component';
import { AdmincouponComponent } from './admin/admincoupon/admincoupon.component';
import { AdminloyaltypointsComponent } from './admin/adminloyaltypoints/adminloyaltypoints.component';
import { VendormapComponent } from './vendormap/vendormap.component';
import { VendorpaymentComponent } from './vendorpayment/vendorpayment.component';

const routes: Routes = [
  { path: '', redirectTo: '/construction', pathMatch: 'full' },
  { path: 'vendordashboard', component: VendordashboardComponent },
  { path: 'vendorprofile', component: VendorprofileComponent },
  { path: 'servicedetails/:serviceId', component: ServicedetailsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'servicelist/:servicetypeId/:cityId', component: ServicelistComponent,pathMatch: 'full' },
  { path: 'userslotbooking', component: UserslotbookingComponent },
  { path: 'package/:serviceId/:serviceTypeId/:vendorId', component: PackageComponent },
  { path: 'userdashboard', component: UserdashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admindashboard', component: AdmindashboardComponent },
  { path: 'userbilling', component: UserbillingComponent },
  {path:'usercart', component: UsercartComponent},
  {path:'orderdetails', component: OrderdetailsComponent},
  {path:'vendorregistration', component: VendorRegistrationComponent},
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
  {path: 'admintempleservices', component: AdmintempleservicesComponent },
  {path: 'vendorsearch', component: VendorsearchComponent },
  {path: 'vendorbooking', component: VendorbookingComponent },
  {path: 'productcategories', component: ProductcategoriesComponent },
  {path: 'templeservices', component: TempleservicesComponent },
  {path: 'temple-details', component: TempleDetailsComponent },
  {path: 'admincoupon', component: AdmincouponComponent },
  {path: 'adminloyaltypoints', component: AdminloyaltypointsComponent },
  {path: 'vendormap', component: VendormapComponent },
  {path: 'vendorpayment', component: VendorpaymentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),NgbModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
