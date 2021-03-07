import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'servicetype',
    loadChildren: () => import('./servicetype/servicetype.module').then( m => m.ServicetypePageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    
    path: 'servicelist/:servicetypeId/:cityId',
    loadChildren: () => import('./servicelist/servicelist.module').then( m => m.ServicelistPageModule)
  },
  {
    
    path: 'servicelist/:servicetypeId/:cityId/:languageName',
    loadChildren: () => import('./servicelist/servicelist.module').then( m => m.ServicelistPageModule)
  },
  {
    
    path: 'servicelist/:serviceId/:servicetypeId/:cityId/:languageName',
    loadChildren: () => import('./servicelist/servicelist.module').then( m => m.ServicelistPageModule)
  },
  {
    path: 'servicedetails/:servicetypeId/:serviceId/:cityId/:languageName',
    loadChildren: () => import('./servicedetails/servicedetails.module').then( m => m.ServicedetailsPageModule)
  },
  {
    path: 'package/:serviceId/:serviceTypeId/:vendorId',
    loadChildren: () => import('./package/package.module').then( m => m.PackagePageModule)
  },
  {
    path: 'package/:serviceTypeId/:serviceId/:vendorId/:cityId/:languageName',
    loadChildren: () => import('./package/package.module').then( m => m.PackagePageModule)
  },
  {
    path: 'package/:serviceTypeId/:serviceId/:cityId/:languageName',
    loadChildren: () => import('./package/package.module').then( m => m.PackagePageModule)
  },
  {
    path: 'userslotbooking',
    loadChildren: () => import('./userslotbooking/userslotbooking.module').then( m => m.UserslotbookingPageModule)
  },
  {
    path: 'usercart',
    loadChildren: () => import('./usercart/usercart.module').then( m => m.UsercartPageModule)
  },
  {
    path: 'userbilling',
    loadChildren: () => import('./userbilling/userbilling.module').then( m => m.UserbillingPageModule)
  },
  {
    path: 'orderdetails',
    loadChildren: () => import('./orderdetails/orderdetails.module').then( m => m.OrderdetailsPageModule)
  },
  {
    path: 'vendorsearchmap/:servicetypeId/:serviceId/:cityId/:languageName',
    loadChildren: () => import('./vendorsearchmap/vendorsearchmap.module').then( m => m.VendorsearchmapPageModule)
  },
  {
    path: 'vendorsearchmap',
    loadChildren: () => import('./vendorsearchmap/vendorsearchmap.module').then( m => m.VendorsearchmapPageModule)
  },
  {
    path: 'vendordashboard',
    loadChildren: () => import('./vendordashboard/vendordashboard.module').then( m => m.VendordashboardPageModule)
  },
  {
    path: 'vendortracklocation/:bookingId/:vendorId/:userId',
    loadChildren: () => import('./vendortracklocation/vendortracklocation.module').then( m => m.VendortracklocationPageModule)
  },
  {
    path: 'usertracklocation/:bookingId/:userId/:vendorId',
    loadChildren: () => import('./usertracklocation/usertracklocation.module').then( m => m.UsertracklocationPageModule)
  },
  {
    path: 'login/:isotp',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'userdashboard',
    loadChildren: () => import('./userdashboard/userdashboard.module').then( m => m.UserdashboardPageModule)
  },
  {
    path: 'loginhome',
    loadChildren: () => import('./loginhome/loginhome.module').then( m => m.LoginhomePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
