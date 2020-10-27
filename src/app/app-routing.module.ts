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

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
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
  { path: 'userbilling/:serviceId/:serviceTypeId', component: UserbillingComponent },
  {path:'usercart', component: UsercartComponent},
  {path:'orderdetails', component: OrderdetailsComponent},
  {path:'vendorregistration', component: VendorRegistrationComponent},
  {path:'userprofile', component: UserprofileComponent},
  {path:'adminvendorenquiry', component: AdminvendorenquiryComponent},
  {path:'vendorenquiry', component: VendorEnquiryComponent},
  {path:'vendorlocation', component: VendorlocationComponent},
  {path:'vendorcity', component: VendorcityComponent},
  {path:'adminservicetype', component: AdminservicetypeComponent},
  {path:'adminservicedetails', component: AdminservicedetailsComponent},
  {path:'adminlogin', component: AdminloginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes),NgbModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
