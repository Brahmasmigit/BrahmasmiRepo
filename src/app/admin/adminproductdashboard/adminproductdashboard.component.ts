import { Component, OnInit,ViewChild,  ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AdminProductDashboardService} from './adminproductdashboard.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {UtilitiesService} from '../../shared/services/utilities.service';
import {ToastService} from '../../shared/services/toastservice';

@Component({
  selector: 'app-adminproductdashboard',
  templateUrl: './adminproductdashboard.component.html',
  styleUrls: ['./adminproductdashboard.component.css']
})
export class AdminproductdashboardComponent implements OnInit {
  adminDasboard:[]=[];
  errorMessage:any;
  booking:any={};
  completedRequests:number;
  totalRequests:number;
  pendingRequests:number;
  closeResult: string;
  City:any=[];
  cityId:any;
  storelist:any=[];
  HighlightRow : any;
  storeId:any="";
  bookingId:any;
  storeupdate:any={};
  @ViewChild('mymodal') mymodal: ElementRef;
  constructor(private activatedRoute: ActivatedRoute,
    private toastService:ToastService,
    private  modalService: NgbModal,
    private utilitiesService :UtilitiesService,
    private adminProductDashboardService:AdminProductDashboardService) { }

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
    this.getStores(this.cityId);
  }
  getStores(cityId:any)
  {
    this.utilitiesService.getStores(cityId).subscribe(
      (data) => {
          if (data) {
              this.storelist = data;

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
    this.adminProductDashboardService.getbookingdata(statusid,bookingdate).subscribe(
      (data) => {
          if (data) {
              this.adminDasboard = data;
              this.totalRequests=this.adminDasboard.length;
              this.completedRequests=this.adminDasboard.filter((c:any)=>
                c.bookingStatusId =="5"
              ).length;
              this.pendingRequests=this.adminDasboard.filter((c:any)=>
                c.bookingStatusId !="5" &&  c.bookingStatusId !="4"
              ).length;
          }

      },
      (error) => {
          this.errorMessage = error;
      },
      () => {

      });
  }

  ChangeStatus(bookingid,statusid,storename)
  {
    if((storename==undefined || storename=="") && statusid!=4)
    {
      this.showError("Please Assign Store before Approve");
      return;
    }
    this.booking.BookingId=Number(bookingid);
    this.booking.BookingStatusId=Number(statusid);

    this.adminProductDashboardService.ChangeBookingStatus(this.booking).subscribe(
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
  AssignStore(bookingid)
  {
    this.bookingId=bookingid;
    this.storeId="";
    this.HighlightRow =-1;
    this.cityId=1;
    this.getStores(1);
    this.modalplaceOrder(this.mymodal);
  }
  SelectStore(storeid,index)
  {
    this.HighlightRow = index;
    this.storeId= storeid;
  }
  SubmitStore()
  {
    if(this.storeId==undefined || this.storeId=="")
    {
      this.showError("Please Select Store");
      return;
    }
    this.storeupdate.BookingId=Number(this.bookingId);
    this.storeupdate.StoreId=Number(this.storeId);

    this.adminProductDashboardService.UpdateStore(this.storeupdate).subscribe(
      (data) => {
          if (data) {
            this.storeId="";
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
        this.storeId="";
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
