import { Component, OnInit,ViewChild,  ElementRef,Renderer2, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ToastService} from '../shared/services/toastservice';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {UtilitiesService} from '../shared/services/utilities.service';
import {WindowRefService } from '../shared/services/windowref.service';
import { environment } from '../../environments/environment'
import {VendorRegistrationService} from '../vendorregistration/vendorregistration.service';
import {UserBillingService} from '../userbilling/userbilling.service';

declare var RazorPay:any;

@Component({
  selector: 'app-vendorpayment',
  templateUrl: './vendorpayment.component.html',
  styleUrls: ['./vendorpayment.component.css']
})
export class VendorpaymentComponent implements OnInit {

  applicationcode:any;
  membershipid:any=0;
  isPaymentchecked:string="razor";
  total:any;
  private razorKey : any= environment.RazorKey;
  @ViewChild('mymodal') mymodal: ElementRef;
  errorMessage:any;
  closeResult: string;
  ischecked:boolean=false;
  vendorinfo:any={};
  vendorname:any;
  membsership:any={};
  constructor(private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private vendorRegistrationService : VendorRegistrationService,
    private utilitiesService :UtilitiesService,
    private  modalService: NgbModal,
    private windowRefService: WindowRefService,
    private ngZone: NgZone,
    private userBillingService:UserBillingService

    ) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("vendorinfo")!=null)
    {
      this.vendorinfo=JSON.parse(sessionStorage.getItem("vendorinfo"));
      this.applicationcode=this.vendorinfo.applicationcode;
      this.vendorname=this.vendorinfo.Name;
    }
  }
  SelectPlan(id,amount)
  {
    this.membershipid=id;
    this.total=amount;
  }
  razorpayOptions= {

    "key": this.razorKey,
    "amount": 0, // amount should be in paise format to display Rs 1255 without decimal point
    "currency": 'INR',
    "image": '../../assets/Logoicon.png',
    "name": '', // company name or product name
    "description": 'Brahmasmi',  // product description
    "order_id": '', // order_id created by you in backend
    "handler": (res)=>{
      console.log(res);
      //this.ngZone.run(() => this.razorPayResponseHandler(res))
      this.razorPayResponseHandler(res);
    }

};
  PlaceOrder()
  {
      if(this.membershipid!=0)
      {
        if(this.isPaymentchecked=="razor")
        {
        var payment:any={};
        payment.Amount=Number(this.total) * 100;
        payment.Currency="INR";
        payment.orderId="";
        this.userBillingService.initializePayment(payment).subscribe(
          (data) => {
              if (data) {
              this.razorpayOptions.order_id=data.orderId;
              this.razorpayOptions.amount=Number(this.total) * 100;
              this.razorpayOptions.name= this.vendorname;
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
        else if(this.isPaymentchecked=="cod" || this.isPaymentchecked=="upi")
        {
          this.modalplaceOrder(this.mymodal);
        }
      }
      else
      {
        this.showError("Please Select Membership Plan");
      }
  }
  razorPayResponseHandler(response)
  {
    let paymentResponse:any={};
    paymentResponse.RazorOrderId = response.razorpay_order_id;
    paymentResponse.RazorPaymentId= response.razorpay_payment_id;
    paymentResponse.RazorSignature = response.razorpay_signature;
    paymentResponse.IsPaymentSuccess=false;
    this.userBillingService.confirmPayment(paymentResponse).subscribe(
      (data) => {
        if(data.isPaymentSuccess)
        {

          this.Confirm();

        }
        else
        {
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
  Confirm()
  {
    let bookingstatusid;
    let paymentstatus;
    let paymentMode;
    if(this.isPaymentchecked=='cod')
    {
      paymentMode=7;//cod
      bookingstatusid=7;//onhold
      paymentstatus=4;//onhold
    }
    else if( this.isPaymentchecked=='upi')
    {
      paymentMode=4;//upi
      bookingstatusid=7;//onhold
      paymentstatus=4;//onhold
    }
    else if( this.isPaymentchecked=='razor')
    {
      paymentMode=1;//card
      bookingstatusid=7;//onhold
      paymentstatus=4;//onhold
    }
    this.membsership.ModeofPayment=paymentMode;
    this.membsership.BookingStatusId=bookingstatusid;
    this.membsership.PaymentStatus=paymentstatus;
    this.membsership.ApplicationNumber=this.applicationcode;
    this.membsership.membershipid=this.membershipid;
    this.membsership.AmountPaid=this.total;

    this.vendorRegistrationService.VendorPayment(this.membsership).subscribe(
      (data) => {
          if (data) {
            this.modalService.dismissAll("done");
            let arrOrders:any=[];
            arrOrders=data;
            let checkresult = arrOrders.find(x=> x.result==0);
            if(checkresult==null || checkresult==undefined)
            {
              sessionStorage.setItem("cartType","vendorpayment");
              sessionStorage.setItem("orders",JSON.stringify(arrOrders));
              this.ngZone.run(()=> {
                this.router.navigate(['/orderdetails']);
              });
            }
            else
            {
              this.showError("Payment is failed, We will manually check and refund your Amount");
            }

          }

      },
      (error) => {
          this.modalService.dismissAll("done");
          this.errorMessage = error;
          this.showError("Payment is failed, We will manually check and refund your Amount");
      },
      () => {

      }
    );//end of service
  }
  modalplaceOrder(content) {
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
  }
  showError(msg) {
    this.toastService.show(msg, {
      classname: 'bg-danger text-light',
      delay: 4000 ,
      autohide: true,
      headertext: 'Error!'
    });
  }

}
