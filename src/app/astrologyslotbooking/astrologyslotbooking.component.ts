import { Component, OnInit,ViewChild } from '@angular/core';
import {UtilitiesService} from '../shared/services/utilities.service';
import {ToastService} from '../shared/services/toastservice';
import { AstrologySlotBookingService } from './astrologyslotbooking.service';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {UserBillingService} from '../userbilling/userbilling.service';

@Component({
  selector: 'app-slotbooking',
  templateUrl: './astrologyslotbooking.component.html',
  styleUrls: ['./astrologyslotbooking.component.css']
})
export class AstrologySlotbookingComponent implements OnInit {
  Languages:any;
  Categories:any;
  City:any;checkedValue:any;
  slot:any={};errorMessage:any;
  userInfo:any={};
  selectedCategory:any;
  selectedCity:any;
  astrologyuser:any={};
  userid:any;
  cityId:any;
  @ViewChild('slotBookingForm') myForm: NgForm;
  constructor(private utilitiesService:UtilitiesService, private toastService:ToastService,
               private userBillingService:UserBillingService,
              private router:Router,
              private astrologySlotBookingService:AstrologySlotBookingService) { }

  ngOnInit(): void {
    //this.slot.titleID=data[0].titleID;
    this.cityId=1;
    this. getAllCity();

    this.getAstrologyCategories();
    this.getLanguages();
    if(sessionStorage.getItem("userInfo")!=null)
    {
      this.userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
      this.userid=this.userInfo.userId;
      this.getUserdetails(this.userid);
    }
  }
  getUserdetails(userid)
  {
    this.userBillingService.getUserDetails(userid).subscribe(
      (data) => {
          if (data) {
            this.slot.name=data.userName;
            this.slot.emailID=data.emailId;
            this.slot.mobileNumber=data.mobileNumber;
            //this.cityId=data.cityId;

          }

      },
      (error) => {
          this.errorMessage = error;
      },
      () => {

      });
  }
  onAstrologyChange(selectedCategory) {
    this.slot.amount=selectedCategory.amount;

  }
  getAllCity()
  {
    this.utilitiesService.getAllCities().subscribe(
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
getLanguages()
{
  this.utilitiesService.getlanguages().subscribe(
    (data) => {
        if (data) {
            this.Languages = data;

        }
    },
    (error) => {
        this.errorMessage = error;
    },
    () => {
    }
);
}
getAstrologyCategories()
{
  this.astrologySlotBookingService.getAstrologyCategories().subscribe(
    (data) => {
      if(data)
      {
         this.Categories=data;
         console.log(data)
      }
    },
    (error) => {
        this.errorMessage = error;
    },
    () => {
    }
);
}
getAstrologyAmount(astrologyID)
{
  this.astrologySlotBookingService.getAstrologyAmount(astrologyID).subscribe(
    (data) => {
      if(data)
      {
         //this.AstrologyAmount=data;
         console.log(data)
         this.slot.amount=data.amount;
      }
    },
    (error) => {
        this.errorMessage = error;
    },
    () => {
    }
);
}
  onCheckboxChange(evnt)
  {
   console.log(evnt)
   console.log(evnt.target.checked);
   this.checkedValue=evnt.target.checked;
  }
  slotBooking()
  {
    if(this.checkedValue==false)
    {
      this.showError('Please Accept Terms&Condition')
      return;
    }
    this.slot.astrologyID=Number(this.selectedCategory.astrologyID);
    this.slot.cityID=Number(this.selectedCity.cityID);
    this.slot.languageID=Number(this.slot.languageID);

    this.astrologyuser.name=this.slot.name;
    this.astrologyuser.emailId=this.slot.emailID;
    this.astrologyuser.mobileNumber=this.slot.mobileNumber;
    this.astrologyuser.cityId=this.selectedCity.cityID;

    let orders:any={};
          let orderdetails:any=[];
          orders.ServiceId=Number(this.slot.astrologyID);
          orders.ServiceTypeId=1;
          orders.ServiceName=this.selectedCategory.astrologyName;//tbd
          orders.CityName=this.selectedCity.cityName;
          orders.PackageId=0;
          orders.PackageName="";
          orders.Total= Number(this.slot.amount);
          orders.BookingDate=this.slot.slotDate;
          orders.BookingTime=this.slot.slotTime;
          if(sessionStorage.getItem("userInfo")!=null)
          {
          this.userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
          orders.UserId=Number(this.userInfo.userId);
          }
          else
          {
            orders.UserId=0;
          }

          orders.VendorId= 0;
          orderdetails.push(orders);
          if(sessionStorage.getItem("orderdetails")!=null)
          {
              var arrorder=JSON.parse(sessionStorage.getItem("orderdetails"));
              var data=arrorder.find(x=> x.ServiceId==this.slot.astrologyID);
              if(data==null)
              {
              arrorder.push(orders);
              sessionStorage.setItem("orderdetails",JSON.stringify(arrorder));
              }
              else
              {
                this.showError("Category already added to Cart.");
                return;
              }

          }
          else
          {
            sessionStorage.setItem("orderdetails",JSON.stringify(orderdetails));
          }

    this.astrologySlotBookingService.saveSlotDetails(this.slot).subscribe(
      (resdata) => {
        if(resdata=="1")
        {

        this.slot={};
        this.checkedValue=false;
        sessionStorage.setItem("cartType","astrology");
        sessionStorage.setItem("astrologyuserdetails",JSON.stringify(this.astrologyuser));
        this.router.navigate(['/usercart'], { queryParams: { serviceId: this.selectedCategory.astrologyID,serviceTypeId:0} });

        }
        else
        {
          this.showError('Slot Booking is not Done, Please try after some time')
        console.log("DB Exception");
        }
      },
      (error) => {
          this.errorMessage = error;
      },
      () => {
        this.myForm.resetForm();
      });
  }
  showError(msg) {
    this.toastService.show(msg, {
      classname: 'bg-info text-light',
      delay: 5000 ,
      autohide: true,
      headertext: 'Astrology Slot Booking details!'
    });
  }
}
