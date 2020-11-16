import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ToastService} from '../shared/services/toastservice'
import {StoreDashboardService} from '../storedashboard/storedashboard.service';

@Component({
  selector: 'app-storedashboard',
  templateUrl: './storedashboard.component.html',
  styleUrls: ['./storedashboard.component.css']
})
export class StoredashboardComponent implements OnInit {

  orderdetails:any=[];
  orders:any=[];
  errorMessage:any;
  invoiceno:any;
  booking:any={};
  isReload:boolean=false;
  storeid:any;
  caltype:any;
  userInfo:any;
  constructor(private toastService: ToastService,private activatedRoute: ActivatedRoute,
    private storeDashboardService:StoreDashboardService,
    private router:Router,) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("userInfo")!=null)
    {
      this.userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
      this.storeid=this.userInfo.userId;
      this.caltype="current";
      this.getStoreOrderdetails(this.storeid,"","current");
    }
    else
    {
      this.router.navigate(['/login']);
    }


  }
  getStoreOrderdetails(storeid,storetype,calendartype)
  {
    this.storeDashboardService.getStoreOrderdetails(storeid,storetype,calendartype).subscribe(
      (data) => {
          if (data) {
              this.orderdetails = data;
          }
      },
      (error) => {
          this.errorMessage = error;
      },
      () => {
      }
  );
  }
  CalendarTab(CalendarTab)
  {
    this.caltype=CalendarTab;
    this.getStoreOrderdetails(this.storeid,"",CalendarTab);
  }
  Accept(bookingid,statusid,storeQuantity)
  {
    if(storeQuantity == 0)
    {
      this.showError("Please Add Stock Quantity");
      return;
    }
    this.booking.BookingId=Number(bookingid);
    this.booking.BookingStatusId=Number(statusid);

    this.storeDashboardService.ChangeBookingStatus(this.booking).subscribe(
      (data) => {
          if (data) {
              if(data=="1")
              {
                this.caltype="current";
                this.getStoreOrderdetails(this.storeid,"","current");
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
  ViewDetails(item)
  {

  }
  showError(msg) {
    this.toastService.show(msg, {
      classname: 'bg-info text-light',
      delay: 5000 ,
      autohide: true,
      headertext: 'Store details!'
    });
  }

}
