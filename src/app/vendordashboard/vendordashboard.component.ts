import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {VendorDashboardService} from './vendordashboard.service';
import {EventModel} from '../shared/models/eventmodel';
import {EventListenerService} from '../shared/services/eventlistener.service';

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
  userInfo:any={}
  constructor(private activatedRoute: ActivatedRoute,
    private vendorDashboardService:VendorDashboardService,
    private router:Router,
    private eventListenerService:EventListenerService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("userInfo")!=null)
    {
      this.userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
      this.vendorId=this.userInfo.userId;
      this.getOngoing(this.vendorId,"current");
    }
    else
    {
      this.router.navigate(['/login']);
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
  //this.eventListenerService.addToEventBus("Accept",true);
  }
  ngOnDestroy() {
  }
}
