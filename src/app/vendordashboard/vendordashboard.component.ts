import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private activatedRoute: ActivatedRoute,
    private vendorDashboardService:VendorDashboardService,
    private eventListenerService:EventListenerService) { }

  ngOnInit(): void {
    var vendorid=1;
    this.getOngoing(vendorid);
  }

  getOngoing(vendorid)
  {
    this.vendorDashboardService.getOngoing(vendorid).subscribe(
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
                var vendorid=1;
                this.getOngoing(vendorid);
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
