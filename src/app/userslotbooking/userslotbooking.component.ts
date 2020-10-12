import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {UserSlotBookingService}  from './userslotbooking.service';

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
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router ,
    private serviceDetailsService:UserSlotBookingService
    )
   {

    }

  ngOnInit(): void {
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
        }
      });
    }
  }
  Booking()
  {
    this.orderdetails.forEach((element,i) => {
      if(element.ServiceId==this.serviceId)
      {
        this.orderdetails[i].BookingDate=this.booking.BookingDate;
        this.orderdetails[i].BookingTime=this.booking.BookingTime;
        this.orderdetails[i].ReviewComments=this.booking.ReviewComments;
      }
    });
    sessionStorage.setItem("orderdetails", JSON.stringify(this.orderdetails));
    this.router.navigate(['/usercart'], { queryParams: { serviceId: this.serviceId,serviceTypeId:this.serviceTypeId} });
  }
}
