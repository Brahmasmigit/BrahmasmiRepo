import { Component, OnInit } from '@angular/core';
import {VendorEnquiryService} from './vendorenquiry.service';
import {Router,ActivatedRoute } from '@angular/router';
import {ToastService} from '../shared/services/toastservice';

@Component({
  selector: 'app-vendorenquiry',
  templateUrl: './vendorenquiry.component.html',
  styleUrls: ['./vendorenquiry.component.css']
})
export class VendorEnquiryComponent implements OnInit {
  errorMessage:any;
  vendorModel:any={};
  cityId:any;
  constructor(
    private vendorEnquiryService : VendorEnquiryService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
  //  this.cityId= this.activatedRoute.snapshot.params['cityId'];
  if(sessionStorage.getItem("CityID")!=null)
  {
    this.cityId=sessionStorage.getItem("CityID")
  }
  }
  saveVendor()
  {
 this.vendorModel.cityID=Number(this.cityId);
    this.vendorEnquiryService.SaveVendorData(this.vendorModel).subscribe(
      (data) => {
          if (data) {
              if(data=="1")
              {
              this.vendorModel={};
              this.showError('Your details are Saved, we will contact you soon...')
              }
              else
              {
                this.showError('Your details are not Saved, Please try after some time')
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
      headertext: 'Enquiry details!'
    });
  }

}
