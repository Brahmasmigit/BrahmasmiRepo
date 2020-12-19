import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { CartItems, City, TempleUserBillingDetails, TempleUserServiceRequest, UserServiceRequest } from 'src/app/admin/admintempleservices/templeservice.model';
import { ToastService } from 'src/app/shared/services/toastservice';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { UserBillingService } from 'src/app/userbilling/userbilling.service';
import { environment } from 'src/environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { WindowRefService } from 'src/app/shared/services/windowref.service';
import { Router } from '@angular/router';
import { TempleUserBillingService } from './templeuserbilling.service';

@Component({
  selector: 'app-templeuserbilling',
  templateUrl: './templeuserbilling.component.html',
  styleUrls: ['./templeuserbilling.component.css']
})
export class TempleUserBillingComponent implements OnInit {

  errorMessage: any;
  templeUserBilling: TempleUserBillingDetails = {} as TempleUserBillingDetails;
  templeUserCartItems: TempleUserServiceRequest[] = {} as TempleUserServiceRequest[];
  templeUserBillingItems: UserServiceRequest = {} as UserServiceRequest;
  city: City[] = {} as City[];
  subTotal: number = 0;
  discount: number = 0;
  total: number = 0;
  isPaymentchecked: string = "razor";
  private razorKey: any = environment.RazorKey;
  closeResult: string;
  @ViewChild('mymodal') mymodal: ElementRef;
  // cartitems: any = [];
  cartItems: CartItems = {} as CartItems;
  accommodation: boolean;

  constructor(private utilitiesService: UtilitiesService,
    private toastService: ToastService,
    private userBillingService: UserBillingService,
    private templeUserBillingService: TempleUserBillingService,
    private modalService: NgbModal,
    private windowRefService: WindowRefService,
    private router: Router,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.getCity(0);
    this.LoadTempleCartItems();
  }

  LoadTempleCartItems() {
    if (sessionStorage.getItem("templeServiceDetails") != null || sessionStorage.getItem("templeServiceDetails") != undefined) {
      this.templeUserBillingItems = JSON.parse(sessionStorage.getItem("templeServiceDetails"));
      // this.cartItems = this.templeUserBillingItems;
      console.log('temple', this.templeUserBillingItems);
      this.DisplayUserDetails();
      this.CalculateTotalItemsPrice();
    }
    // if (sessionStorage.getItem("templeServiceDetails") != null || sessionStorage.getItem("templeServiceDetails") != undefined) {
    //   this.templeUserCartItems = JSON.parse(sessionStorage.getItem("templeServiceDetails"));
    //   this.cartitems = this.templeUserCartItems;
    //   console.log('temple', this.templeUserCartItems);
    //   this.CalculateTotalItemsPrice();
    // }
  }

  DisplayUserDetails() {
    this.templeUserBilling.UserName = this.templeUserBillingItems.UserName;
    this.templeUserBilling.UserMobileNo = this.templeUserBillingItems.UserMobileNo;
    this.templeUserBilling.UserEmail = this.templeUserBillingItems.UserEmail;
    this.accommodation = this.templeUserBillingItems.RoomTypeId > 0 ? true : false;
  }

  CalculateTotalItemsPrice() {
    this.subTotal = 0;
    this.total = 0;
    // this.templeUserCartItems.forEach(item => {
    //   this.subTotal += item.ServicePrice;
    // });
    this.templeUserBillingItems.serviceDetails.forEach(item => {
      this.subTotal += item.ServicePrice;
    });

    this.subTotal += this.templeUserBillingItems.RoomPrice;
    this.subTotal += this.templeUserBillingItems.DarshanPrice;

    this.total = this.subTotal;
  }

  getCity(StateID: number) {
    // this.Cities = {} as City;
    this.city = [];

    this.utilitiesService.getCities(StateID).subscribe(
      (data) => {
        if (data)
          this.city = data;
      },
      (error) => {
        this.errorMessage = error;
      });
  }

  PlaceOrder() {
    if (this.templeUserBilling.UserName == undefined || this.templeUserBilling.UserName == "") {
      this.showError("Please Enter your Name");
      return;
    }
    if (this.templeUserBilling.UserMobileNo == undefined || this.templeUserBilling.UserMobileNo == "") {
      this.showError("Please Enter your Mobile Number");
      return;
    }
    if (this.templeUserBilling.UserEmail == undefined || this.templeUserBilling.UserEmail == "") {
      this.showError("Please Enter your Email Id");
      return;
    }
    if (this.templeUserBilling.UserAddress == undefined || this.templeUserBilling.UserAddress == "") {
      this.showError("Please Enter your Address");
      return;
    }
    if (this.templeUserBilling.Pincode == undefined || this.templeUserBilling.Pincode == "") {
      this.showError("Please Enter your Pincode");
      return;
    }

    if (this.isPaymentchecked == "razor") {
      var payment: any = {};
      payment.Amount = Number(this.total) * 100;
      payment.Currency = "INR";
      payment.orderId = "";
      this.userBillingService.initializePayment(payment).subscribe(
        (data) => {
          if (data) {
            this.razorpayOptions.order_id = data.orderId;
            this.razorpayOptions.amount = Number(this.total) * 100;
            this.razorpayOptions.name = this.templeUserBilling.UserName;
            const rzp = new this.windowRefService.nativeWindow.Razorpay(this.razorpayOptions);
            rzp.open();
          }

        },
        (error) => {
          this.errorMessage = error;
          this.showError("Payment is failed, please try after some time");
        },
        () => {

        });
    }//razor if
    else if (this.isPaymentchecked == "cod" || this.isPaymentchecked == "upi") {
      this.modalplaceOrder(this.mymodal);
    }


  }

  razorpayOptions = {

    "key": this.razorKey,
    "amount": 0, // amount should be in paise format to display Rs 1255 without decimal point
    "currency": 'INR',
    "image": '../../assets/Astrology.jpeg',
    "name": '', // company name or product name
    "description": 'Brahmasmi',  // product description
    "order_id": '', // order_id created by you in backend
    "handler": (res) => {
      console.log(res);
      //this.ngZone.run(() => this.razorPayResponseHandler(res))
      this.razorPayResponseHandler(res);
    }

  };

  razorPayResponseHandler(response) {
    let paymentResponse: any = {};
    paymentResponse.RazorOrderId = response.razorpay_order_id;
    paymentResponse.RazorPaymentId = response.razorpay_payment_id;
    paymentResponse.RazorSignature = response.razorpay_signature;
    paymentResponse.IsPaymentSuccess = false;
    this.userBillingService.confirmPayment(paymentResponse).subscribe(
      (data) => {
        if (data.isPaymentSuccess) {
          // if (this.cartType == "service" || this.cartType == "astrology" || this.cartType == "virtual") {
          this.Confirm();
          //}
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

  Confirm() {
    // if (this.templeUserCartItems.length > 0) {
    if (this.templeUserBillingItems.serviceDetails.length > 0) {
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
      else if (this.isPaymentchecked == 'razor') {
        paymentMode = 1;//card
        bookingstatusid = 7;//onhold
        paymentstatus = 4;//onhold
      }

      // for (var i = 0; i < this.templeUserBillingItems.serviceDetails.length; i++) {
      this.cartItems.BookingLocation = this.city.find(c => c.cityID == Number(this.templeUserBilling.CityId)).cityName;
      this.cartItems.BookingStatusId = bookingstatusid;
      this.cartItems.PinCode = this.templeUserBilling.Pincode;
      this.cartItems.MobileNumber = this.templeUserBilling.UserMobileNo;
      this.cartItems.EmailId = this.templeUserBilling.UserEmail;
      this.cartItems.NewAddress = this.templeUserBilling.UserAddress
      this.cartItems.NewPinCode = this.templeUserBilling.Pincode;
      this.cartItems.UserName = this.templeUserBilling.UserName;
      this.cartItems.CityId = Number(this.templeUserBilling.CityId);
      this.cartItems.NewCityId = Number(this.templeUserBilling.CityId);
      this.cartItems.PaymentStatus = paymentstatus;
      this.cartItems.PaymentMode = paymentMode;
      this.cartItems.OrderNo = '';
      this.cartItems.InvoiceNo = '';
      this.cartItems.Total = this.total;
      this.cartItems.UserQuery = this.templeUserBillingItems.UserRequestQuery;
      this.cartItems.TempleId = this.templeUserBillingItems.TempleId;
      
      this.cartItems.RoomTypeId = Number(this.templeUserBillingItems.RoomTypeId);
      this.cartItems.RoomType = this.templeUserBillingItems.RoomType;
      this.cartItems.RoomPrice = this.templeUserBillingItems.RoomPrice;
      
      this.cartItems.DarshanTypeId = Number(this.templeUserBillingItems.DarshanTypeId);
      this.cartItems.DarshanType = this.templeUserBillingItems.DarshanType;
      this.cartItems.DarshanPrice = this.templeUserBillingItems.DarshanPrice;
      
      this.cartItems.ServiceDetails = this.templeUserBillingItems.serviceDetails;

      console.log('car', this.cartItems);
      // }
      this.templeUserBillingService.UserBooking(this.cartItems).subscribe(
        (data) => {
          if (data) {
            this.modalService.dismissAll("done");
            let arrOrders: any = [];
            arrOrders = data;
            let checkresult = arrOrders.find(x => x.result == 0);
            if (checkresult == null || checkresult == undefined) {
              sessionStorage.removeItem("templeorders");
              sessionStorage.setItem("templeorders", JSON.stringify(arrOrders));
              this.ngZone.run(() => {
                this.router.navigate(['/templeorderdetails']);
              });
            }
            else {
              this.showError("Booking is failed, We will manually check and refund your Amount");
            }

          }

        },
        (error) => {
          this.modalService.dismissAll("done");
          this.errorMessage = error;
          this.showError("Booking is failed, We will manually check and refund your Amount");
        },
        () => {

        }
      );
    }

  }

  modalplaceOrder(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "xlModal" }).result.then((result) => {
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
      return `with: ${reason}`;
    }
  }

  showError(msg) {
    this.toastService.show(msg, {
      classname: 'bg-danger text-light',
      delay: 4000,
      autohide: true,
      headertext: 'Error!'
    });
  }

}
