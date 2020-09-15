import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AdminDashboardService} from './admindashboard.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  adminDasboard:[]=[];
  errorMessage:any;
  booking:any={};

  constructor(private activatedRoute: ActivatedRoute,
    private adminDashboardService:AdminDashboardService) { }

  ngOnInit(): void {
    this.getbookingData();
  }
  getbookingData()
  {
    let statusid=0;
    let bookingdate=null;
    this.adminDashboardService.getbookingdata(statusid,bookingdate).subscribe(
      (data) => {
          if (data) {
              this.adminDasboard = data;
          }

      },
      (error) => {
          this.errorMessage = error;     
      },
      () => {
       
      });
  }

  ChangeStatus(bookingid,statusid)
  {
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
  //this.eventListenerService.addToEventBus("Accept",true);
  }
  ngOnDestroy() {
  }

}
