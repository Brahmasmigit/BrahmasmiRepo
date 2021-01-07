import { Component, OnInit } from '@angular/core';
import {ServiceType} from '../servicetype/servicetype.service'
import { LoadingController } from '@ionic/angular';  
import { Router } from '@angular/router';  

@Component({
  selector: 'app-servicetype',
  templateUrl: './servicetype.page.html',
  styleUrls: ['./servicetype.page.scss'],
})
export class ServicetypePage implements OnInit {
  servicetypes:any=[];
  errorMessage:string;
  cityId:any;
  loaderToShow: any;  
  constructor(private serviceType: ServiceType,private loadingCtrl: LoadingController,private router: Router) { }

  ngOnInit() {
    this.cityId=1;
    this.getServiceTypes(this.cityId);
  }
  getServiceTypes(cityid)
  {
    this.showLoader();
    this.serviceType.getServiceTypes(cityid).subscribe(
      (data) => {
          if (data) {
              this.servicetypes = data;
          }

      },
      (error) => {
        console.log(error);
          this.errorMessage = error;   
          this. hideLoader();  
      },
      () => {
       this. hideLoader();
      });
  }
  showLoader() {  
    this.loaderToShow = this.loadingCtrl.create({  
      message: 'Loading...'  
    }).then((res) => {  
      res.present();  
   
      res.onDidDismiss().then((dis) => {  
      });  
    });  
    //this.hideLoader();  
  }  
   
  hideLoader() {  
    this.loadingCtrl.dismiss();   
  }  
Back()
{
  this.router.navigate(['/home']); 
}
Navigate(serviceTypeID,cityId)
{
  this.router.navigate(['/servicelist',serviceTypeID,cityId]); 
}
}
