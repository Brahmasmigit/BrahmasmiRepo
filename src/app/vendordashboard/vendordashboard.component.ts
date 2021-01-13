import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {VendorDashboardService} from './vendordashboard.service';
import {EventModel} from '../shared/models/eventmodel';
import {EventListenerService} from '../shared/services/eventlistener.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-vendordashboard',
  templateUrl: './vendordashboard.component.html',
  styleUrls: ['./vendordashboard.component.css']
})
export class VendordashboardComponent implements OnInit {

  isChecked :boolean;
  ongoing:[]=[];
  errorMessage:any;
  booking:any={};
  vendorId:any;
  userInfo:any={};
  closeResult: string;
  latitude:number;
  longitude:number;

  constructor(private activatedRoute: ActivatedRoute,
    private vendorDashboardService:VendorDashboardService,
    private router:Router,
    private  modalService: NgbModal,
    private eventListenerService:EventListenerService) { }

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
        this.setCurrentLocation();
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
  ngOnDestroy() {
  }
}
