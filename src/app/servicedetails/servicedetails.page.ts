import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {ServiceDetailsService}  from './servicedetails.service';
import { LoadingController,NavController } from '@ionic/angular';  


@Component({
  selector: 'app-servicedetails',
  templateUrl: './servicedetails.page.html',
  styleUrls: ['./servicedetails.page.scss'],
})
export class ServicedetailsPage implements OnInit {

  serviceDetails:any={}
  errorMessage:any;
  haveImg:boolean=false;
  paramsModel:any={};
  loaderToShow: any=false;  
  serviceId:number;
  public isCollapsed = true;
  public isCollapsed2= true;
  public isCollapsed3= true;
  public isCollapsed4= true;
  constructor(private activatedRoute: ActivatedRoute,private serviceDetailsService:ServiceDetailsService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private navCtrl: NavController
    ) { }

  ngOnInit() {
    this.serviceId= this.activatedRoute.snapshot.params['serviceId'];
    //var languageName= this.activatedRoute.snapshot.params['languageName'];
    //var CityId= this.activatedRoute.snapshot.params['cityId'];
    //this.paramsModel.languageName=languageName;
    //this.paramsModel.cityId=CityId;
    this.getServiceDetails(this.serviceId);
  }
  getServiceDetails(serviceId)
  {
    this.showLoader();
    this.serviceDetailsService.getServiceDetails(serviceId).subscribe(
      (data) => {
          if (data) {
              this.serviceDetails = data;
              if(this.serviceDetails.serviceImage==null)
              {
                this.haveImg=false;
              }
              else{
                this.haveImg=true;
              }
          }

      },
      (error) => {
        this.errorMessage = error; 
        console.log(error);    
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
    this.navCtrl.back();
    
    //this.router.navigate(['/servicelist']); 
    
  }
  Navigate()
  {
    this.router.navigate(['/package',  this.serviceId]); 
  }

}
