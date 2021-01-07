import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {PackageService}  from './package.service';
import { LoadingController,NavController } from '@ionic/angular'; 
import { ToastController } from '@ionic/angular';  

@Component({
  selector: 'app-package',
  templateUrl: './package.page.html',
  styleUrls: ['./package.page.scss'],
})
export class PackagePage implements OnInit {
  packages:any=[];
  errorMessage:any;
  selected = -1
  total:any ="";
  packagename:string;
  serviceId:any;
  serviceTypeId:any;
  userInfo:any={};
  vendorId:any;languageName:any;cityId:any;
  isPoojaKit:boolean=false;
  loaderToShow:any=false;
  constructor(private activatedRoute: ActivatedRoute,  private loadingCtrl: LoadingController,public toastCtrl: ToastController,
    private router: Router,
    private navCtrl: NavController, private packageService:PackageService) { }

  ngOnInit() {
    this.serviceId= this.activatedRoute.snapshot.params['serviceId'];
   this.serviceTypeId= 1;//this.activatedRoute.snapshot.params['serviceTypeId'];
  //  this.vendorId= this.activatedRoute.snapshot.params['vendorId'];
   // this.languageName= this.activatedRoute.snapshot.params['languageName'];
    this.cityId= 1;//this.activatedRoute.snapshot.params['cityId'];
    this.getServiceDetails(this.serviceId);
  }
  getServiceDetails(serviceId)
  {
    this.packageService.getUserPackages(serviceId).subscribe(
      (data) => {
          if (data) {
              this.packages = data;
          }

      },
      (error) => {
          this.errorMessage = error;
      },
      () => {

      });
  }
  isCheckMaterial(item,m,event,index)
  {
    if(event.target.checked)
    {
       this.isPoojaKit=true;
      this.packages[index].price=item.price + m.itemPrice;

    }
    else
    {
      this.isPoojaKit=false;
      this.packages[index].price=this.packages[index].price - m.itemPrice;
    }
    if(this.selected==index)
    {
    this.total= this.packages[index].price;
    }
  }
  selectPackage(index,selectedpackage)
  {
    this.selected=index;
    this.total=this.packages[index].price;
    this.packagename=selectedpackage;
  }
  Continue()
  {
     if(this.selected!=-1)
      {
        if(this.packages.length>0)
        {
        let orders:any={};
        let orderdetails:any=[];
        orders.ServiceId=Number(this.serviceId);
        orders.languageName=this.languageName;
        orders.ServiceTypeId=Number(this.serviceTypeId);
        orders.ServiceName=this.packages[0].serviceName;
        orders.CityName=this.packages[0].cityName;
        orders.PackageId=Number(this.packages[0].packageId);
        orders.PackageName=this.packagename;
        orders.Total= Number(this.total);
        if(this.isPoojaKit==true)
        {
          orders.itemName=this.packages[0].itemName;
        }
        else{
          orders.itemName=null;
        }
        if(sessionStorage.getItem("userInfo")!=null)
        {
        this.userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
        orders.UserId=Number(this.userInfo.userId);
        }
        else
        {
          orders.UserId=0;
        }

        orders.VendorId= Number(this.vendorId);
        orderdetails.push(orders);
        if(sessionStorage.getItem("orderdetails")!=null)
        {
            var arrorder=JSON.parse(sessionStorage.getItem("orderdetails"));
            var data=arrorder.find(x=> x.ServiceId==this.serviceId);
            if(data==null)
            {
            arrorder.push(orders);
            sessionStorage.setItem("orderdetails",JSON.stringify(arrorder));
            }
            else
            {
             // this.showError("Service already added to Cart.");
              return;
            }

        }
        else
        {
          sessionStorage.setItem("orderdetails",JSON.stringify(orderdetails));
        }

        this.router.navigate(['/userslotbooking'], { queryParams: { serviceId: this.serviceId,serviceTypeId:this.serviceTypeId} });
        }
      }
      else
      {
       // this.showError("Please Select Package");
       this.ShowError('Please Select Package');
      }
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
    
  }
  async ShowError(msg) {  
    const toast = await this.toastCtrl.create({  
      message: msg,   
      position: 'middle',  
      duration: 2000,
      color:'danger'
    });  
    toast.present();  
    toast.onDidDismiss().then((val) => {  
      console.log('Toast Dismissed');  
    });  
  } 
}
