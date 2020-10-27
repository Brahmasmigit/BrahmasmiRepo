import { Component, OnInit,ViewChild,  ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AdminDashboardService} from './admindashboard.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {UtilitiesService} from '../../shared/services/utilities.service';
import {ToastService} from '../../shared/services/toastservice';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  adminDasboard:[]=[];
  errorMessage:any;
  booking:any={};
  completedRequests:number;
  totalRequests:number;
  pendingRequests:number;
  closeResult: string;
  City:any=[];
  cityId:any;
  vendorlist:any=[];
  HighlightRow : any;
  vendorId:any="";
  bookingId:any;
  vendorupdate:any={};
  @ViewChild('mymodal') mymodal: ElementRef;
  constructor(private activatedRoute: ActivatedRoute,
    private toastService:ToastService,
    private  modalService: NgbModal,
    private utilitiesService :UtilitiesService,
    private adminDashboardService:AdminDashboardService) { }

  ngOnInit(): void {
    this.getbookingData();
    this.cityId=1;
    this.getCity();
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
  selectCity(event:any)
  {
    this.cityId=event.target.value;
    this.getVendors(this.cityId);
  }
  getVendors(cityId:any)
  {
    this.utilitiesService.getVendor(cityId).subscribe(
      (data) => {
          if (data) {
              this.vendorlist = data;

          }

      },
      (error) => {
          this.errorMessage = error;
      },
      () => {
      } );
  }

  getbookingData()
  {
    let statusid=0;
    let bookingdate=null;
    this.adminDashboardService.getbookingdata(statusid,bookingdate).subscribe(
      (data) => {
          if (data) {
              this.adminDasboard = data;
              this.totalRequests=this.adminDasboard.length;
              this.completedRequests=this.adminDasboard.filter((c:any)=>
                c.bookingStatusID =="5"
              ).length;
              this.pendingRequests=this.adminDasboard.filter((c:any)=>
                c.bookingStatusID !="5" &&  c.bookingStatusID !="4"
              ).length;
          }

      },
      (error) => {
          this.errorMessage = error;
      },
      () => {

      });
  }

  ChangeStatus(bookingid,statusid,vendorname)
  {
    if(vendorname==undefined || vendorname=="" && statusid!=4)
    {
      this.showError("Please Assign Vendor before Approve");
      return;
    }
    this.booking.BookingId=Number(bookingid);
    this.booking.BookingStatusId=Number(statusid);

    this.adminDashboardService.ChangeBookingStatus(this.booking).subscribe(
      (data) => {
          if (data) {
              if(data=="1")
              {
                this.getbookingData();
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
  AssignVendor(bookingid)
  {
    this.bookingId=bookingid;
    this.vendorId="";
    this.HighlightRow =-1;
    this.cityId=1;
    this.getVendors(1);
    this.modalplaceOrder(this.mymodal);
  }
  SelectVendor(vendorid,index)
  {
    this.HighlightRow = index;
    this.vendorId= vendorid;
  }
  SubmitVendor()
  {
    if(this.vendorId==undefined || this.vendorId=="")
    {
      this.showError("Please Select Vendor");
      return;
    }
    this.vendorupdate.BookingId=Number(this.bookingId);
    this.vendorupdate.VendorId=Number(this.vendorId);

    this.adminDashboardService.UpdateVendor(this.vendorupdate).subscribe(
      (data) => {
          if (data) {
            this.vendorId="";
            this.modalService.dismissAll("done");
              if(data=="1")
              {

                this.getbookingData();
              }
              else
              {
                this.errorMessage ="Record not updated, please try after some time."
              }
          }

      },
      (error) => {
        this.vendorId="";
          this.errorMessage = error;
      },
      () => {

      });
  }
  showError(msg) {
    this.toastService.show(msg, {
      classname: 'bg-info text-light',
      delay: 3000 ,
      autohide: true,
      headertext: 'Admin!'
    });
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
  ngOnDestroy() {
  }

}
