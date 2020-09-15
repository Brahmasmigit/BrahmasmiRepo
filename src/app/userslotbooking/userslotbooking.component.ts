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
  serviceId:number;
  serviceTypeId:number;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router ,
    private serviceDetailsService:UserSlotBookingService
    )
   {
     this.serviceId= this.activatedRoute.snapshot.params['serviceId'];
     this.serviceTypeId= this.activatedRoute.snapshot.params['serviceTypeId'];
    }

  ngOnInit(): void {
  }
  Booking()
  {
    this.booking.ServiceId=this.serviceId;
    this.booking.ServiceTypeId=this.serviceTypeId;
    this.booking.BookingStatusId=1;
    this.booking.UserId=1;
    this.booking.VendorId=1;
    this.booking.BookingLocation="Bachupally, Hyderabad"
    this.booking.BookingType="User Booking"
    this.serviceDetailsService.UserBooking(this.booking).subscribe(
      (data) => {
          if (data) {
            if(data=="1")
            {
              this.router.navigate(['/userdashboard']);
            }
          }

      },
      (error) => {
          this.errorMessage = error;     
      },
      () => {
       
      }
    );
  }
}
