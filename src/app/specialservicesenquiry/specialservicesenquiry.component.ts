import { Component, OnInit,ViewChild } from '@angular/core';
import {SpecialServicesEnquiryService} from './specialservicesenquiry.service';
import {Router,ActivatedRoute } from '@angular/router';
import {ToastService} from '../shared/services/toastservice';
import {UtilitiesService} from '../shared/services/utilities.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-specialservicesenquiry',
  templateUrl: './specialservicesenquiry.component.html',
  styleUrls: ['./specialservicesenquiry.component.css']
})
export class SpecialservicesenquiryComponent implements OnInit {
  btnText:string;latitude:any;longitude:any;
  serviceModel:any={};
  SpecialServiceID:any;
  brahmasmiotherservicesModel:any={};Services:any;
  errorMessage:any;
  @ViewChild('brahmasmiotherservicesForm') myForm: NgForm;
  constructor(
    private specialServicesEnquiryService : SpecialServicesEnquiryService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,private utilitiesService:UtilitiesService
  ) { }
  ngOnInit(): void {
    this.btnText="Submit";
    this.getSpecialservices();
    this.setCurrentLocation();
  }
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.serviceModel.latitude=this.latitude;
        this.serviceModel.longitude=this.longitude;
      });
    }
  }
  getSpecialservices()
  {
    this.specialServicesEnquiryService.getSpecialservices().subscribe(
      (data) => {
          if (data) {
              this.Services = data;

          }

      },
      (error) => {
          this.errorMessage = error;
      },
      () => {
      }
  );
}
getAllSpecialServicesEnquiry()
{
  this.specialServicesEnquiryService.getAllSpecialServicesEnquiry().subscribe(
    (data) => {
        if (data) {
            this.Services = data;

        }

    },
    (error) => {
        this.errorMessage = error;
    },
    () => {
    }
);
}

  brahmasmiotherservices()
  {
    console.log(this.serviceModel);
    this.serviceModel.specialServiceID=Number(this.serviceModel.specialServiceID);
     this.specialServicesEnquiryService.RegisterEnquiry(this.serviceModel).subscribe(
       (data) => {
           if (data) {
               if(data=="1")
               {
                 console.log(data)
                 this.myForm.resetForm();
               this.showError('Your Request Submitted Successfully...')
               this.serviceModel={};
               this.route.navigate(['./homepage']);
               }
               else
               {
                 this.showError('Your query is not sent, Please try after some time')
               console.log("DB Exception");
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
showError(msg) {
  this.toastService.show(msg, {
    classname: 'bg-info text-light',
    delay: 5000 ,
    autohide: true,
    headertext: 'Special Service Details!'
  });
}
}
