import { Component, OnInit, ViewChild } from '@angular/core';
import {VendorEnquiryService} from './vendorenquiry.service';
import {Router,ActivatedRoute } from '@angular/router';
import {ToastService} from '../shared/services/toastservice';
import {UtilitiesService} from '../shared/services/utilities.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-vendorenquiry',
  templateUrl: './vendorenquiry.component.html',
  styleUrls: ['./vendorenquiry.component.css']
})
export class VendorEnquiryComponent implements OnInit {
  errorMessage:any;
  vendorModel:any={};
  City:any=[];
  Languages:any=[];
  selectedCity:any;
  selectedLanguage:any=[];
  States:any=[];
  userTypes:any=[];
  isOthers:boolean=false;
  Countries:any=[];
  @ViewChild('enquiryForm') myForm: NgForm;

  constructor(
    private vendorEnquiryService : VendorEnquiryService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private utilitiesService:UtilitiesService

  ) { }

  ngOnInit(): void {
      //  this.cityId= this.activatedRoute.snapshot.params['cityId'];
      //if(sessionStorage.getItem("CityID")!=null)
    // {
      // this.cityId=sessionStorage.getItem("CityID")
    // }
   this.userTypes=[
    { userType: 2, userTypeName: "Pandit" },
    { userType: 5, userTypeName: "Astrologer" },
    { userType: 4, userTypeName: "Puja Store" },
    { userType: 6, userTypeName: "Others" }
   ]
   this.Countries=[
    { countryId: 1, countryName: "India" }
   ]
    this. getAllCity();
    this. getState();
    this.getLanguages();
    this.vendorModel.userType=2;
    this.vendorModel.cityID=1;
    this.vendorModel.stateID=1;
    this.vendorModel.countryId=1;
  }
  getState()
{
  this.utilitiesService.getStates().subscribe(
    (data) => {
        if (data) {
            this.States = data;
        }
    },
    (error) => {
        this.errorMessage = error;
    },
    () => {
    }
);
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
  change(e, type){

    if(type.isChecked==true){
      this.selectedLanguage.push(type);
    }
    else
    {
      if(this.selectedLanguage.length>0)
      {
      this.selectedLanguage.forEach((element,i) => {
        if(element.languageID==type.languageID)
        {
          this.selectedLanguage.splice(i,1);
        }
      });
      }
    }
    if(type.languageName=="Others")
    {
      if(type.isChecked==true){
        this.isOthers=true;
      }
      else
      {
        this.isOthers=false;
        this.vendorModel.language="";
      }
    }
   }
  saveVendor()
  {
    if(this.vendorModel.name=="" || this.vendorModel.name==null)
    {
      this.showError("Please enter your Full Name");
      return;
    }
    if(this.vendorModel.address1=="" || this.vendorModel.address1==null)
    {
      this.showError("Please enter your Address");
      return;
    }
    if(this.vendorModel.mobileNumber=="" || this.vendorModel.mobileNumber==null)
    {
      this.showError("Please enter your Mobile Number");
      return;
    }
    if(this.vendorModel.emailID=="" || this.vendorModel.emailID==null)
    {
      this.showError("Please enter your Email Id");
      return;
    }
    this.vendorModel.userType=Number(this.vendorModel.userType);
    this.vendorModel.cityID=Number(this.vendorModel.cityID);
    this.vendorModel.stateID=Number(this.vendorModel.stateID);
    this.vendorModel.countryId=Number(this.vendorModel.countryId);
    this.vendorModel.ListLanguages=this.selectedLanguage;
    this.vendorEnquiryService.SaveVendorData(this.vendorModel).subscribe(
      (data) => {
          if (data) {
              if(data=="1")
              {

              this.showError('Your information has been submitted successfully');
              }
              else
              {
                this.showError('Your details are not Submitted, Please try after some time');
              }
          }
      },
      (error) => {
        this.showError('Your details are not Submitted, Please try after some time');
      },
      () => {

        //this.myForm.resetForm();
        this.vendorModel={};
        this.selectedLanguage=[];
        this.vendorModel.userType=2;
        this.vendorModel.cityID=1;
        this.vendorModel.stateID=1;
        this.vendorModel.countryId=1;
        this.isOthers=false;
        this.vendorModel.language="";
        this.vendorModel.name="";
        this.vendorModel.address1="";
        this.vendorModel.address2="";
        this.vendorModel.pincode="";
        this.vendorModel.email="";
        this.vendorModel.gothram="";
        this.vendorModel.dob="";
        this.vendorModel.vedashaka="";
        this.vendorModel.rishipravara="";
        this.vendorModel.mobilenumber="";
        this.vendorModel.alternative="";
        if(this.Languages.length>0)
        {
        this.Languages.forEach(element => {
          element.isChecked=false;
        });
        }
      }
    );
  }

  showError(msg) {
    this.toastService.show(msg, {
      classname: 'bg-info text-light',
      delay: 4000 ,
      autohide: true,
      headertext: 'Enquiry details!'
    });
  }

}
