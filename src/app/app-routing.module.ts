import { NgModule } from '@angular/core';
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

const routes: Routes = [
  { path: 'vendordashboard', component: VendordashboardComponent },
  { path: 'vendorprofile', component: VendorprofileComponent },
  { path: 'servicedetails/:serviceId', component: ServicedetailsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'servicelist/:servicetypeId/:cityId', component: ServicelistComponent,pathMatch: 'full' },
  { path: 'userslotbooking/:serviceId/:serviceTypeId', component: UserslotbookingComponent },
  { path: 'userdashboard', component: UserdashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admindashboard', component: AdmindashboardComponent },
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
