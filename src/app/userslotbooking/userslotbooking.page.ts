import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; 
import { LoadingController,NavController } from '@ionic/angular';  


@Component({
  selector: 'app-userslotbooking',
  templateUrl: './userslotbooking.page.html',
  styleUrls: ['./userslotbooking.page.scss'],
})
export class UserslotbookingPage implements OnInit {
  booking:any={};
  errorMessage:string;
  serviceId:any;
  serviceTypeId:any;
  serviceName:any;
  orderdetails:any=[];
  closeResult: string;
  selectVendorOption:boolean=true;
  autoVendorId:string;poojakitname:boolean=false;
  constructor(private activatedRoute: ActivatedRoute,public toastCtrl: ToastController,private navCtrl: NavController,
    private router: Router ,) { }

  ngOnInit() {
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("txtDate")[0].setAttribute('min', today);
    this.activatedRoute.queryParams.subscribe(params => {
      this.serviceId = params.serviceId;
      this.serviceTypeId = params.serviceTypeId;

    } );
    if(sessionStorage.getItem("orderdetails")!=null)
    {
      this.orderdetails=JSON.parse(sessionStorage.getItem("orderdetails"));

      this.orderdetails.forEach(element => {
        if(element.ServiceId==this.serviceId)
        {
          this.booking.cityName=element.CityName;
          this.booking.serviceName=element.ServiceName;
          if(element.itemName!=null)
          {
            this.poojakitname=true;
            this.booking.itemName=element.itemName;
          }
          else{
               this.poojakitname=false;
          }
       
          this.booking.Total=element.Total;
          this.booking.packageName=element.PackageName;
          this.booking.languageName=element.languageName;
          this.autoVendorId=element.VendorId;
        }
      });
    }
  }
  Booking()
  {

    if(this.booking.BookingDate == undefined || this.booking.BookingDate=="")
    {
      this.ShowError("Please Select Date");
      return;
    }
    if(this.booking.BookingTime == undefined || this.booking.BookingTime=="")
    {
      this.ShowError("Please Select Time");
      return;
    }
    this.orderdetails.forEach((element,i) => {
      if(element.ServiceId==this.serviceId)
      {
        this.orderdetails[i].BookingDate=this.booking.BookingDate;
        this.orderdetails[i].BookingTime=this.booking.BookingTime;
        this.orderdetails[i].ReviewComments="";//this.booking.ReviewComments;
        //this.orderdetails[i].VendorId=this.selectVendorOption == true ? this.autoVendorId: Number(this.booking.vendorId);
        this.orderdetails[i].VendorId= Number(this.booking.vendorId);
      }
    });
    sessionStorage.setItem("orderdetails", JSON.stringify(this.orderdetails));
    sessionStorage.setItem("cartType","service");
    this.router.navigate(['/usercart'], { queryParams: { serviceId: this.serviceId,serviceTypeId:this.serviceTypeId} });
  }
  selectVendor(event)
  {
    if(event.target.value=="choosevendor")
    {
      this.selectVendorOption=false;
      //this.placeOrder(this.mymodal);
    }
    else
    {
      this.selectVendorOption=true;
      this.booking.vendorId=""
      this.booking.vendorName=""
      this.booking.vendorAddress="";
    }
  }
  getVendorDetails(e)
  {
    this.booking.vendorId=e.vendorId;
    this.booking.vendorName=e.vendorName;
    this.booking.vendorAddress=e.vendorAddress;
    this.selectVendorOption=false;
    //this.modalService.dismissAll("done");
  }
  Back()
  {
    this.navCtrl.back();
    
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
