import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ToastController,AlertController  } from '@ionic/angular'; 
import { LoadingController,NavController } from '@ionic/angular';  
import {VendorDashboardService} from './vendordashboard.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-vendordashboard',
  templateUrl: './vendordashboard.page.html',
  styleUrls: ['./vendordashboard.page.scss'],
})
export class VendordashboardPage implements OnInit {


  isChecked :boolean;
  ongoing:[]=[];
  errorMessage:any;
  booking:any={};
  vendorId:any;
  userInfo:any={};
  closeResult: string;
  latitude:number;
  longitude:number;
  loaderToShow: any=false;  
  customAlertOptions: any = {
    header: 'Update Current Status',
    translucent: true
  };

 
  constructor(private activatedRoute: ActivatedRoute,
    private vendorDashboardService: VendorDashboardService,
    private router:Router,
    private loadingCtrl: LoadingController,
    public toastCtrl: ToastController,private navCtrl: NavController,
    public alertController: AlertController) {

  }
  
  ngOnInit(): void {
    if(sessionStorage.getItem("userInfo")!=null)
    {
      this.userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
      console.log(this.userInfo.name)
      if(this.userInfo.userTypeId=="2" ||this.userInfo.userTypeId=="5" )
      {
        this.vendorId=this.userInfo.userId;

        this.getOngoing(this.vendorId,"current");
        console.log('tabchanged')
        //this.setCurrentLocation();
      }
      else
      {
        this.router.navigate(['/login']);
      }

    }
    else
    {
      this.router.navigate(['/login']);
    }
  }
   setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        let vendorgeo:any={};
        vendorgeo.Latitude=this.latitude.toFixed(2);
        vendorgeo.Longitude=this.longitude.toFixed(2);
        vendorgeo.VendorId=this.vendorId
        this.vendorDashboardService.VendorGeoUpdate(vendorgeo).subscribe(
          (data) => {
              if (data) {
                console.log("Geo: " + data);
              }

          },
          (error) => {
              console.log(error);
              this.errorMessage = error;
          },
          () => {

          });
      });
    }


  }
  getOngoing(vendorid,calendarType)
  {
    this.vendorDashboardService.getOngoing(vendorid,calendarType).subscribe(
      (data) => {
          if (data) {
              this.ongoing = data;
          }

      },
      (error) => {
          this.errorMessage = error;
      },
      () => {

      });
  }

  Accept(bookingid,statusid)
  {
    this.booking.BookingId=Number(bookingid);
    this.booking.BookingStatusId=Number(statusid);

    this.vendorDashboardService.ChangeBookingStatus(this.booking).subscribe(
      (data) => {
          if (data) {
              if(data=="1")
              {
                this.getOngoing(this.vendorId,"current");
              }
              else
              {
                this.errorMessage ="Record not updated, please try after some time."
              }
          }

      },
      (error) => {
          this.errorMessage = error;
      },
      () => {

      });
  }
  Meeting(bookingId)
  {
    sessionStorage.setItem("BookingId",bookingId);
    this.router.navigate(['/zoomuser']);
  }
  CalendarTab(CalendarTab)
  {
    console.log('changed')
    this.getOngoing(this.vendorId,CalendarTab);
    console.log('changed')
  }
 /* placeOrder(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass : "xlModal"}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }*/


 onChange(CValue) {
     console.log(CValue);
   }
  async modalplaceOrder() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cash after Service',
      message: 'Are you sure you want to do the payment after Service?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Okay',
          handler: () => {
            //this.Confirm();
          }
        }
      ]
    });

    await alert.present();
  }
  async showError(msg) {  
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
  TrackLocation(bookingId,userId)
  {
    this.router.navigate(['/vendortracklocation',bookingId,this.vendorId,userId]); 
  }
  ngOnDestroy() {
  }
}
