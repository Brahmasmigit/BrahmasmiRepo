import { Component, OnInit, ViewChild, ElementRef, Renderer2, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserBillingService } from '../userbilling/userbilling.service';
import { UtilitiesService } from '../shared/services/utilities.service';
import { environment } from '../../environments/environment'
import { ToastController,AlertController  } from '@ionic/angular'; 
import { LoadingController,NavController } from '@ionic/angular';  

declare var RazorPay: any;
@Component({
  selector: 'app-userbilling',
  templateUrl: './userbilling.page.html',
  styleUrls: ['./userbilling.page.scss'],
})
export class UserbillingPage implements OnInit {
  ischecked: boolean = false;
  cartitems: any = [];
  subtotal: number = 0;
  discount: any = 0;
  total: number = 0;
  userid: any;
  userdetails: any = {};
  errorMessage: any;
  closeResult: string;
  isPaymentchecked: string = "ccavenue";
  booking: any = {};
  serviceId: any;
  serviceTypeId: any;
  userInfo: any = {};
  cityId: any;
  City: any = [];
  cartType: any;
  productitems: any = [];
  astrologyuser: any = {};
  @ViewChild('mymodal') mymodal: ElementRef;
  virtualuser: any = {};
  gst: number = 3.6;
  poojakitname: boolean = false;
  cartTypeByMap: boolean = false;
  loaderToShow: any;  
  encRequestRes: any;
  @ViewChild('form') form: ElementRef;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userBillingService: UserBillingService,
    private utilitiesService: UtilitiesService,
    private loadingCtrl: LoadingController,
    public toastCtrl: ToastController,private navCtrl: NavController,
    public alertController: AlertController,
    private ngZone: NgZone) { }

  ngOnInit() {
    this.userdetails.cityId = 1;
    this.userdetails.billingcityId = 1;
    this.getCity();
    this.loadCart();

    if (sessionStorage.getItem("userInfo") != null) {
      this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      this.userid = this.userInfo.userId;
      this.getUserdetails(this.userid);
    }
    else {
      this.userid = 0;
      if (sessionStorage.getItem("astrologyuserdetails") != null) {
        this.astrologyuser = JSON.parse(sessionStorage.getItem("astrologyuserdetails"));
        this.userdetails.userName = this.astrologyuser.name;
        this.userdetails.mobileNumber = this.astrologyuser.mobileNumber;
        this.userdetails.emailId = this.astrologyuser.emailId;
        this.userdetails.cityId = this.astrologyuser.cityId;
      }
      if (sessionStorage.getItem("virtualuserdetails") != null) {
        this.virtualuser = JSON.parse(sessionStorage.getItem("virtualuserdetails"));
        this.userdetails.userName = this.virtualuser.name;
        this.userdetails.mobileNumber = this.virtualuser.mobileNumber;
        this.userdetails.emailId = this.virtualuser.emailId;
        this.userdetails.cityId = this.virtualuser.cityId;
      }
    }
  }
  getCity() {

    this.utilitiesService.getCities(0).subscribe(
      (data) => {
        if (data) {
          this.City = data;

        }

      },
      (error) => {
        this.errorMessage = error;
      },
      () => {
      }
    );
  }
  loadCart() {
    if (sessionStorage.getItem("cartType") != null) {
      this.cartType = sessionStorage.getItem("cartType");
      if (sessionStorage.getItem("cartType") == "ecart") {
        if (sessionStorage.getItem("productdetails") != null) {
          this.productitems = JSON.parse(sessionStorage.getItem("productdetails"));
          this.productitems.forEach((element, i) => {
            this.productitems[i].ProductPrice = element.ProductPrice;
            this.productitems[i].Quantity = element.Quantity;
            this.productitems[i].ProductCost = Number(this.productitems[i].ProductPrice) * Number(this.productitems[i].Quantity);
            this.subtotal += this.productitems[i].ProductCost;
          });
          this.total = this.subtotal;
          this.total = (this.total * this.gst / 100) + this.total;
          this.total = Number(this.total.toFixed());
        }
        else {
          this.subtotal = 0;
          this.total = 0;
          this.gst = 0;
        }
      }

      else if (sessionStorage.getItem("cartType") == "service" || sessionStorage.getItem("cartType") == "astrology" || sessionStorage.getItem("cartType") == "virtual"
        || sessionStorage.getItem("cartType") == "pandit") {
        if (sessionStorage.getItem("orderdetails") != null) {
          this.cartitems = JSON.parse(sessionStorage.getItem("orderdetails"));
          console.log(this.cartitems)
          if (this.cartitems[0].itemName != null) {
            this.poojakitname = true;

          }
          else {
            this.poojakitname = false;
          }
          this.cartitems.forEach(element => {
            this.subtotal += element.Total;
          });
          this.total = this.subtotal;
          this.total = (this.total * this.gst / 100) + this.total;
          this.total = Number(this.total.toFixed());
        }
        else {
          this.subtotal = 0;
          this.total = 0;
          this.gst = 0;
        }
      }
      else if (sessionStorage.getItem("cartType") == "panditByMap") {
        if (sessionStorage.getItem("orderdetailsByMap") != null) {
          this.cartTypeByMap = true;
          this.cartitems = JSON.parse(sessionStorage.getItem("orderdetailsByMap"));
          this.userdetails.billingAddress = this.userdetails.address = this.cartitems[0].isNewLocation ? this.cartitems[0].newLocationAddress : this.cartitems[0].currentLocationAddress;
          this.userdetails.billingPincode = this.userdetails.pinCode = this.cartitems[0].isNewLocation ? this.cartitems[0].newLocationPincode : this.cartitems[0].currentLocationPincode;
          this.userdetails.cityId = this.cartitems[0].CityId;

          this.ischecked = this.cartitems[0].isNewLocation;
          this.cartitems.forEach(element => {
            this.subtotal += element.Total;
          });
          this.total = this.subtotal;
          this.total = (this.total * this.gst / 100) + this.total;
          this.total = Number(this.total.toFixed());
        }
        else {
          this.subtotal = 0;
          this.total = 0;
          this.gst = 0;
        }
      }
    }
  }
  getUserdetails(userid) {
    this.userBillingService.getUserDetails(userid).subscribe(
      (data) => {
        if (data) {
          this.userdetails = data;

        }

      },
      (error) => {
        this.errorMessage = error;
      },
      () => {

      });
  }
  selectCity(event) {

  }
  isdifferentlocation(event) {
    this.ischecked = event.target.checked;

  }
 // modalplaceOrder(content) {
    
 // }

  private getDismissReason(reason: any) {
 
  }
  PlaceOrder() {


    if (this.userdetails.userName == undefined || this.userdetails.userName == "") {
      this.showError("Please Enter your Name");
      return;
    }
    if (this.userdetails.mobileNumber == undefined || this.userdetails.mobileNumber == "") {
      this.showError("Please Enter your Mobile Number");
      return;
    }
    if (this.userdetails.emailId == undefined || this.userdetails.emailId == "") {
      this.showError("Please Enter your Email Id");
      return;
    }
    if (!this.ischecked) {
      if (this.userdetails.address == undefined || this.userdetails.address == "") {
        this.showError("Please Enter your Address");
        return;
      }
      if (this.userdetails.pinCode == undefined || this.userdetails.pinCode == "") {
        this.showError("Please Enter your Pincode");
        return;
      }
    }
    else {
      if (this.userdetails.billingAddress == undefined || this.userdetails.billingAddress == "") {
        this.showError("Please Enter your Address");
        return;
      }
      if (this.userdetails.billingPincode == undefined || this.userdetails.billingPincode == "") {
        this.showError("Please Enter your Pincode");
        return;
      }

    }
   /* if (this.isPaymentchecked == "razor") {
      var payment: any = {};
      payment.Amount = Number(this.total) * 100;
      payment.Currency = "INR";
      payment.orderId = "";
      this.userBillingService.initializePayment(payment).subscribe(
        (data) => {
          if (data) {
            this.razorpayOptions.order_id = data.orderId;
            this.razorpayOptions.amount = Number(this.total) * 100;
            this.razorpayOptions.name = this.userdetails.userName;
            //const rzp = new this.windowRefService.nativeWindow.Razorpay(this.razorpayOptions);
            //rzp.open();
          }

        },
        (error) => {
          this.errorMessage = error;
          this.showError("Payment is failed, please try after some time");
        },
        () => {

        });
    }*///razor if
    if (this.isPaymentchecked == "ccavenue") {
      this.Confirm();
    }
    else if (this.isPaymentchecked == "cod" || this.isPaymentchecked == "upi") {
     this.modalplaceOrder();
   
    }


  }
  razorPayResponseHandler(response) {
    let paymentResponse: any = {};
    paymentResponse.RazorOrderId = response.razorpay_order_id;
    paymentResponse.RazorPaymentId = response.razorpay_payment_id;
    paymentResponse.RazorSignature = response.razorpay_signature;
    paymentResponse.IsPaymentSuccess = false;
    this.userBillingService.confirmPayment(paymentResponse).subscribe(
      (data) => {
        if (data.isPaymentSuccess) {
          if (this.cartType == "service" || this.cartType == "astrology" || this.cartType == "virtual" || this.cartType == "pandit") {
            this.Confirm();
          }
          else if (this.cartType == "ecart") {
            this.ProductConfirm();
          }
        }
        else {
          this.showError("Payment is failed, please try after some time");
        }
      },
      (error) => {
        this.errorMessage = error;
        this.showError("Payment is failed, please try after some time");
      },
      () => {

      });
  }
  razorpayOptions = {

   // "key": this.razorKey,
    "amount": 0, // amount should be in paise format to display Rs 1255 without decimal point
    "currency": 'INR',
    "image": '../../assets/Logoicon.png',
    "name": '', // company name or product name
    "description": 'Brahmasmi',  // product description
    "order_id": '', // order_id created by you in backend
    "handler": (res) => {
      console.log(res);
      //this.ngZone.run(() => this.razorPayResponseHandler(res))
      this.razorPayResponseHandler(res);
    }

  };
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
            this.Confirm();
          }
        }
      ]
    });

    await alert.present();
  }
  Confirm() {
    if (this.cartitems.length > 0) {
      let bookingstatusid;
      let paymentstatus;
      let paymentMode;
      if (this.isPaymentchecked == 'cod') {
        paymentMode = 7;//cod
        bookingstatusid = 7;//onhold
        paymentstatus = 4;//onhold
      }
      else if (this.isPaymentchecked == 'upi') {
        paymentMode = 4;//upi
        bookingstatusid = 7;//onhold
        paymentstatus = 4;//onhold
      }
      else if (this.isPaymentchecked == 'ccavenue') {
        paymentMode = 1;//card
        bookingstatusid = 7;//onhold
        paymentstatus = 4;//onhold
      }

      for (var i = 0; i < this.cartitems.length; i++) {
        this.cartitems[i].BookingLocation = this.userdetails.address;
        if (this.cartType == "virtual" || this.cartType == "pandit"|| this.cartType == "panditByMap") {
          this.cartitems[i].BookingType = this.cartType + this.cartitems[i].serviceType;
        }
        else {
          this.cartitems[i].BookingType = this.cartType;
        }
        this.cartitems[i].BookingStatusId = bookingstatusid;
        this.cartitems[i].PinCode = this.userdetails.pinCode;
        this.cartitems[i].MobileNumber = this.userdetails.mobileNumber;
        this.cartitems[i].EmailId = this.userdetails.emailId;
        this.cartitems[i].NewAddress = this.userdetails.billingAddress == undefined ? '' : this.userdetails.billingAddress;
        this.cartitems[i].NewPinCode = this.userdetails.billingPincode == undefined ? '' : this.userdetails.billingPincode;
        this.cartitems[i].UserName = this.userdetails.userName;
        this.cartitems[i].CityId = Number(this.userdetails.cityId);
        this.cartitems[i].NewCityId = this.userdetails.billingcityId == undefined ? 0 : this.userdetails.billingcityId;
        this.cartitems[i].PaymentStatus = paymentstatus;
        this.cartitems[i].PaymentMode = paymentMode;
        this.cartitems[i].IsDifferentLocation = this.ischecked ? 'Y' : 'N';
        this.cartitems[i].OrderNo = '';
        this.cartitems[i].InvoiceNo = '';
        this.cartitems[i].total = this.total;
      }
      console.log('cart', this.cartitems);
      this.userBillingService.UserBooking(this.cartitems).subscribe(
        (data) => {
          if (data) {
            if (this.isPaymentchecked == 'ccavenue') {
              this.encRequestRes = data[0].encryptedResult;
              setTimeout(() => {
                this.form.nativeElement.submit();
              }, 1000);

            } else {

              //this.modalService.dismissAll("done");
              let arrOrders: any = [];
              arrOrders = data;
              let checkresult = arrOrders.find(x => x.result == 0);
              if (checkresult == null || checkresult == undefined) {
                sessionStorage.removeItem("orderdetails");
                sessionStorage.removeItem("orderdetailsByMap");
                sessionStorage.setItem("orders", JSON.stringify(arrOrders));
                this.ngZone.run(() => {
                  this.router.navigate(['/orderdetails']);
                });
              }
              else {
                this.showError("Booking is failed, We will manually check and refund your Amount");
              }

            }
          }
        },
        (error) => {
         // this.modalService.dismissAll("done");
          this.errorMessage = error;
          this.showError("Booking is failed, We will manually check and refund your Amount");
        },
        () => {

        }
      );//end of service
    }

  }

  ProductConfirm() {
    if (this.productitems.length > 0) {
      let bookingstatusid;
      let paymentstatus;
      let paymentMode;
      if (this.isPaymentchecked == 'cod') {
        paymentMode = 7;//cod
        bookingstatusid = 7;//onhold
        paymentstatus = 4;//onhold
      }
      else if (this.isPaymentchecked == 'upi') {
        paymentMode = 4;//upi
        bookingstatusid = 7;//onhold
        paymentstatus = 4;//onhold
      }
      else if (this.isPaymentchecked == 'ccavenue') {
        paymentMode = 1;//card
        bookingstatusid = 7;//onhold
        paymentstatus = 4;//onhold
      }

      for (var i = 0; i < this.productitems.length; i++) {
        this.productitems[i].StoreId = 0;
        this.productitems[i].ReviewComments = "";
        this.productitems[i].BookingLocation = this.userdetails.address;
        this.productitems[i].BookingType = "ecart";
        this.productitems[i].BookingStatusId = bookingstatusid;
        this.productitems[i].PinCode = this.userdetails.pinCode;
        this.productitems[i].MobileNumber = this.userdetails.mobileNumber;
        this.productitems[i].EmailId = this.userdetails.emailId;
        this.productitems[i].NewAddress = this.userdetails.billingAddress == undefined ? '' : this.userdetails.billingAddress;
        this.productitems[i].NewPinCode = this.userdetails.billingPincode == undefined ? '' : this.userdetails.billingPincode;
        this.productitems[i].UserName = this.userdetails.userName;
        this.productitems[i].CityId = Number(this.userdetails.cityId);
        this.productitems[i].NewCityId = this.userdetails.billingcityId == undefined ? 0 : this.userdetails.billingcityId;
        this.productitems[i].PaymentStatus = paymentstatus;
        this.productitems[i].PaymentMode = paymentMode;
        this.productitems[i].IsDifferentLocation = this.ischecked ? 'Y' : 'N';
        this.productitems[i].OrderNo = '';
        this.productitems[i].InvoiceNo = '';
        this.productitems[i].Total = this.total;
      }
      this.userBillingService.ProductBooking(this.productitems).subscribe(
        (data) => {
          if (data) {
          //  this.modalService.dismissAll("done");
            let arrOrders: any = [];
            arrOrders = data;
            let checkresult = arrOrders.find(x => x.result == 0);
            if (checkresult == null || checkresult == undefined) {
              sessionStorage.removeItem("productdetails");
              sessionStorage.setItem("orders", JSON.stringify(arrOrders));
              this.ngZone.run(() => {
                this.router.navigate(['/orderdetails']);
              });
            }
            else {
              this.showError("Booking is failed, We will manually check and refund your Amount");
            }

          }

        },
        (error) => {
        //  this.modalService.dismissAll("done");
          this.errorMessage = error;
          this.showError("Booking is failed, We will manually check and refund your Amount");
        },
        () => {

        }
      );//end of service
    }

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
  Back()
  {
    this.navCtrl.back();
    
  }

}
