import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ToastService} from '../shared/services/toastservice';
import {UserBillingService} from '../userbilling/userbilling.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {UtilitiesService} from '../shared/services/utilities.service';

@Component({
  selector: 'app-userbilling',
  templateUrl: './userbilling.component.html',
  styleUrls: ['./userbilling.component.css']
})
export class UserbillingComponent implements OnInit {

  ischecked:boolean=false;
  cartitems:any=[];
  subtotal:number=0;
  discount:any=0;
  total:number=0;
  userid:any;
  userdetails:any={};
  errorMessage:any;
  closeResult: string;
  isPaymentchecked:string="cod";
  booking:any={};
  serviceId:any;
  serviceTypeId:any;
  userInfo:any={};
  cityId:any;
  City:any=[];
  constructor(private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private userBillingService:UserBillingService,
    private utilitiesService :UtilitiesService,
    private  modalService: NgbModal) { }

  ngOnInit(): void {
    this.serviceId= this.activatedRoute.snapshot.params['serviceId'];
    this.serviceTypeId =this.activatedRoute.snapshot.params['serviceTypeId'];
    if(sessionStorage.getItem("userInfo")!=null)
      {
        this.userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
        this.userid=this.userInfo.userId;
      }
      this.userdetails.cityId=1;
    this.getCity();
    this.loadCart();
  }
  getCity()
  {

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
  loadCart()
  {
    if(sessionStorage.getItem("orderdetails")!=null)
    {
      this.cartitems=JSON.parse(sessionStorage.getItem("orderdetails"));
      this.cartitems.forEach(element => {
        this.subtotal += element.Total;
      });
      this.total=this.subtotal;
    this.getUserdetails(this.userid);
    }
    else
    {
      this.subtotal=0;
      this.total=0;
    }
  }
  getUserdetails(userid)
  {
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
  selectCity(event)
  {

  }
  isdifferentlocation(event)
  {
    this.ischecked=event.target.checked;
  }
  placeOrder(content) {
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
  Confirm()
  {
    if(this.cartitems.length>0)
    {
      let bookingstatusid;
      let paymentstatus;
      let paymentMode;
      if(this.isPaymentchecked=='cod')
      {
        paymentMode=7;
      }
      else if( this.isPaymentchecked=='upi')
      {
        paymentMode=4;
      }

      if(this.isPaymentchecked=='cod' || this.isPaymentchecked=='upi')
      {
       bookingstatusid=7;
       paymentstatus=4;
      }
      else
      {
        bookingstatusid=1;
      }
      for(var i=0;i<this.cartitems.length;i++)
      {
        this.cartitems[i].BookingLocation=this.userdetails.address;
        this.cartitems[i].BookingType="User Booking";
        this.cartitems[i].BookingStatusId=bookingstatusid;
        this.cartitems[i].PinCode=this.userdetails.pinCode;
        this.cartitems[i].MobileNumber=this.userdetails.mobileNumber;
        this.cartitems[i].EmailId=this.userdetails.emailId;
        this.cartitems[i].NewAddress=this.userdetails.billingAddress == undefined ? '' : this.userdetails.billingAddress;
        this.cartitems[i].NewPinCode=this.userdetails.billingPincode == undefined ? '' : this.userdetails.billingPincode;
        this.cartitems[i].UserName=this.userdetails.userName;
        this.cartitems[i].CityId=Number(this.userdetails.cityId);
        this.cartitems[i].NewCityId=this.userdetails.billingcityId == undefined ? 0 : this.userdetails.billingcityId;
        this.cartitems[i].PaymentStatus=paymentstatus;
        this.cartitems[i].PaymentMode=paymentMode;
        this.cartitems[i].IsDifferentLocation= this.ischecked ? 'Y' : 'N';
        this.cartitems[i].OrderNo='';
        this.cartitems[i].InvoiceNo='';
      }
      this.userBillingService.UserBooking(this.cartitems).subscribe(
        (data) => {
            if (data) {
              this.modalService.dismissAll("done");
              let arrOrders:any=[];
              arrOrders=data;
              let checkresult = arrOrders.find(x=> x.result==0);
              if(checkresult==null || checkresult==undefined)
              {
                sessionStorage.removeItem("orderdetails");
                sessionStorage.setItem("orders",JSON.stringify(arrOrders));
                this.router.navigate(['/orderdetails']);
              }
              else
              {
                this.showError("Booking is failed, please try after some time");
              }

            }

        },
        (error) => {
            this.modalService.dismissAll("done");
            this.errorMessage = error;
            this.showError("Booking is failed, please try after some time");
        },
        () => {

        }
      );
    }

  }
  showError(msg) {
    this.toastService.show(msg, {
      classname: 'bg-danger text-light',
      delay: 2000 ,
      autohide: true,
      headertext: 'Error!'
    });
  }
}
