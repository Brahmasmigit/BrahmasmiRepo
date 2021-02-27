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
  noImg:boolean=false;
  cartitems:any=[];
  vendorId:any;

  constructor(private activatedRoute: ActivatedRoute,private serviceDetailsService:ServiceDetailsService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private navCtrl: NavController
    ) { }

  ngOnInit() {
    var serviceTypeId= this.activatedRoute.snapshot.params['serviceTypeId'];
    var serviceId= this.activatedRoute.snapshot.params['serviceId'];
    var languageName= this.activatedRoute.snapshot.params['languageName'];
    var CityId= this.activatedRoute.snapshot.params['cityId'];
    
    this.paramsModel.languageName=languageName;
    console.log(this.serviceDetails.languageName)
    this.paramsModel.cityId=CityId;
    //var languageName= this.activatedRoute.snapshot.params['languageName'];
    //var CityId= this.activatedRoute.snapshot.params['cityId'];
    //this.paramsModel.languageName=languageName;
    //this.paramsModel.cityId=CityId;
  
    if (sessionStorage.getItem("orderdetailsByMap") != null) {
      this.cartitems = JSON.parse(sessionStorage.getItem("orderdetailsByMap"));
      console.log(this.cartitems)
      this.vendorId=this.cartitems[0].VendorList[0].VendorID;

      }
      this.getServiceDetails(serviceId);
  }
  getServiceDetails(serviceId)
  {
  //  this.showLoader();
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
            //  this.hideLoader();  
          }

      },
      (error) => {
        this.errorMessage = error; 
        console.log(error);    
     //   this.hideLoader();   
      },
      () => {
     //   this.hideLoader();
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
  Navigate(serviceTypeId,serviceId)
  {
    this.router.navigate(['/package',  serviceTypeId,serviceId,this.paramsModel.cityId,this.paramsModel.languageName]); 

  }

}
