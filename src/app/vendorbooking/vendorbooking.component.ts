import { Component, OnInit,ViewChild } from '@angular/core';
import {UtilitiesService} from '../shared/services/utilities.service';
import {ToastService} from '../shared/services/toastservice';
import { VendorBookingService } from './vendorbooking.service';
import { AdminServiceDetailsService } from '../adminservicedetails/adminservicedetails.service';
import { AstrologySlotBookingService } from '../astrologyslotbooking/astrologyslotbooking.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vendorbooking',
  templateUrl: './vendorbooking.component.html',
  styleUrls: ['./vendorbooking.component.css']
})
export class VendorbookingComponent implements OnInit {
  showAstrology:any;
  showPooja:any;
  showPackage:any;
  Languages:any;
  AstroCategories:any;
  virtualVideoCategories:any;
  ServicePackages:any;
  City:any;checkedValue:any;
  slot:any={};errorMessage:any;
  servicePackageModel:any={};
  PoojaServices:any;
  selectedCategory:any;
  userInfo:any={};
  selectedCity:any;
  virtualuser:any={};
  selectedPackage:any;
  vendorid:any;
  @ViewChild('virtualSlotBookingForm') myForm: NgForm;
  constructor(private utilitiesService:UtilitiesService, private toastService:ToastService,private router:Router,
    private vendorBookingService:VendorBookingService,private adminServiceDetailsService:AdminServiceDetailsService
  ,private astrologySlotBookingService:AstrologySlotBookingService ) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("bookingvendorid")!=null)
    {
      this.vendorid=sessionStorage.getItem("bookingvendorid");
      this. getAllCity();
      this.getLanguages();
    }
    else
    {
      this.router.navigate(['/vendorsearch']);
    }

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
         this.AstroCategories=data;
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
getPackageAmount(servicePackageID)
{
  this.vendorBookingService.getPackagePrice(servicePackageID).subscribe(
    (data) => {
      if(data)
      {

         //this.AstrologyAmount=data;
         console.log("Package Amount :")
         console.log(data)
         this.slot.amount=data.price;
      }
    },
    (error) => {
        this.errorMessage = error;
    },
    () => {
    }
);
}
getPackages(serviceID)
{
  this.vendorBookingService.getServicePackage(serviceID).subscribe(
    (data) => {
        if (data) {
            this.ServicePackages = data;

        }
    },
    (error) => {
        this.errorMessage = error;
    },
    () => {
    }
);
}
getAllpoojaServices()
{
this.adminServiceDetailsService.getService().subscribe(
  (data) => {
    if (data) {
      this.PoojaServices = data;
      console.log('pooja services data')
      console.log(this.PoojaServices)
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

 this.checkedValue=evnt.target.checked;
}
onServiceTypeChange(servicetype)
{
  this.slot.amount='';
if(servicetype=="Pooja Services")
{

//this.slot.serviceType="Pooja";
this.getAllpoojaServices();
this.showPooja=true;
this.showAstrology=false;
}
else
if(servicetype=="Astrology Services")
{
  //this.slot.serviceType="Astrology";
  this.getAstrologyCategories();
  this.showAstrology=true;
  this.showPooja=false;
  this.showPackage=false;
}
}
onPoojaChange(selectedCategory)
{
  var serviceID=selectedCategory.serviceID;
  this.getPackages(serviceID);
  this.showPackage=true;
  this.servicePackageModel.serviceID=Number(serviceID);
}
onAstrologyChange(selectedCategory)
{
  var astroID=selectedCategory.astrologyID;
  this.slot.amount=selectedCategory.amount;
  //this.getAstrologyAmount(astroID)
}
onPackageChange(selectedPackage)
{
this.servicePackageModel.packageID=Number(selectedPackage.packageId);
this.getPackageAmount(this.servicePackageModel);
}
BookVirtualSlot()
{
  var serviceName="";
  var packageName="";
  if(this.checkedValue==false)
  {
    this.showError('Please Accept Terms&Condition')
    return;
  }
  if(this.selectedCategory.astrologyID!=null)
  {
    this.slot.serviceID=Number(this.selectedCategory.astrologyID);
    serviceName=this.selectedCategory.astrologyName;
  }
  if(this.selectedCategory.serviceID!=null)
  {
    this.slot.serviceID=Number(this.selectedCategory.serviceID);
    serviceName=this.selectedCategory.serviceName;
  }

  this.slot.cityID=Number(this.selectedCity.cityID);
  this.slot.languageID=Number(this.slot.languageID);
  this.slot.serviceID=Number(this.slot.serviceID);
  if(this.slot.serviceType=="Pooja Services")
  {
    this.slot.serviceType="Pooja";
  }
  else
  if(this.slot.serviceType=="Astrology Services")
  {
    this.slot.serviceType="Astrology";
  }
  if(this.selectedPackage!=undefined)
  {
  this.slot.packageId=this.selectedPackage.packageId != 'NaN' && this.selectedPackage.packageId!=undefined ? Number(this.selectedPackage.packageId) : 0;
  packageName= this.selectedPackage.packageName!=undefined ? this.selectedPackage.packageName : "";
  }
  else
  {
    this.slot.packageId=0;
    packageName="";
  }
  //this.slot.dateOfBirth=Date(this.slot.dateOfBirth);

  let orders:any={};
  let orderdetails:any=[];
  orders.ServiceId=Number( this.slot.serviceID);
  orders.ServiceTypeId=1;
  orders.ServiceName=serviceName;
  orders.CityName=this.selectedCity.cityName;
  orders.PackageId= this.slot.packageId;
  orders.PackageName=packageName;
  orders.Total= Number(this.slot.amount);
  orders.BookingDate=this.slot.slotDate;
  orders.BookingTime=this.slot.slotTime;
  orders.serviceType=this.slot.serviceType;
  if(sessionStorage.getItem("userInfo")!=null)
  {
  this.userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
  orders.UserId=Number(this.userInfo.userId);
  }
  else
  {
    orders.UserId=0;
  }

  orders.VendorId=  Number(this.vendorid);
  orderdetails.push(orders);
  if(sessionStorage.getItem("orderdetails")!=null)
  {
      var arrorder=JSON.parse(sessionStorage.getItem("orderdetails"));
      var data=arrorder.find(x=> x.ServiceId==this.slot.serviceID && x.serviceType==this.slot.serviceType);
      if(data==null)
      {
      arrorder.push(orders);
      sessionStorage.setItem("orderdetails",JSON.stringify(arrorder));
      }
      else
      {
        this.showError("Service already added to Cart.");
        return;
      }

  }
  else
  {
    sessionStorage.setItem("orderdetails",JSON.stringify(orderdetails));
  }
  this.slot={};
  this.checkedValue=false;
  sessionStorage.setItem("cartType","pandit");
  this.router.navigate(['/usercart'], { queryParams: { serviceId: this.slot.serviceID,serviceTypeId:0} });
  this.myForm.resetForm();
}
showError(msg) {
  this.toastService.show(msg, {
    classname: 'bg-info text-light',
    delay: 4000 ,
    autohide: true,
    headertext: 'Virtual Video Slot Booking details!'
  });
}
}
