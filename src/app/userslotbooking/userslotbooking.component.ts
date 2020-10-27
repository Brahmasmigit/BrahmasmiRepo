import { Component, OnInit, ViewChild,  ElementRef } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {UserSlotBookingService}  from './userslotbooking.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ToastService} from '../shared/services/toastservice';

@Component({
  selector: 'app-userslotbooking',
  templateUrl: './userslotbooking.component.html',
  styleUrls: ['./userslotbooking.component.css']
})
export class UserslotbookingComponent implements OnInit {

  booking:any={};
  errorMessage:string;
  serviceId:any;
  serviceTypeId:any;
  serviceName:any;
  orderdetails:any=[];
  closeResult: string;
  selectVendorOption:boolean=true;
  autoVendorId:string;
  @ViewChild('mymodal') mymodal: ElementRef;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router ,
    private  modalService: NgbModal,
    private serviceDetailsService:UserSlotBookingService,
    private toastService:ToastService
    )
   {

    }

  ngOnInit(): void {
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
          this.booking.Total=element.Total;
          this.booking.packageName=element.PackageName;
          this.autoVendorId=element.VendorId;
        }
      });
    }
  }
  Booking()
  {

    if(this.booking.BookingDate == undefined || this.booking.BookingDate=="")
    {
      this.showError("Please Select Date");
      return;
    }
    if(this.booking.BookingTime == undefined || this.booking.BookingTime=="")
    {
      this.showError("Please Select Time");
      return;
    }
    this.orderdetails.forEach((element,i) => {
      if(element.ServiceId==this.serviceId)
      {
        this.orderdetails[i].BookingDate=this.booking.BookingDate;
        this.orderdetails[i].BookingTime=this.booking.BookingTime;
        this.orderdetails[i].ReviewComments="";//this.booking.ReviewComments;
        this.orderdetails[i].VendorId=this.selectVendorOption == true ? this.autoVendorId: Number(this.booking.vendorId);
      }
    });
    sessionStorage.setItem("orderdetails", JSON.stringify(this.orderdetails));
    this.router.navigate(['/usercart'], { queryParams: { serviceId: this.serviceId,serviceTypeId:this.serviceTypeId} });
  }
  selectVendor(event)
  {
    if(event.target.value=="choosevendor")
    {
      this.selectVendorOption=false;
      this.placeOrder(this.mymodal);
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
    this.modalService.dismissAll("done");
  }
  placeOrder(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass : "xlModalvendor"}).result.then((result) => {
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
