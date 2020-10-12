import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import {VendorRegistrationService} from './vendorregistration.service';
import {UtilitiesService} from '../shared/services/utilities.service';
import {ToastService} from '../shared/services/toastservice';

@Component({
  selector: 'app-vendorregistration',
  templateUrl: './vendorregistration.component.html',
  styleUrls: ['./vendorregistration.component.css']
})
export class VendorRegistrationComponent implements OnInit {
  vendor:any={};
  selectedCertification = [];
  vendorSocialNetwork:any={};
  Title:any=[];Certification:any=[];SocialNetwork:any=[];
  errorMessage:any;
  RelationArray: Array<DynamicGrid> = [];
  SpecializationArray: Array<DynamicGrid1>=[];
  newRelation: any = {};
  newSpecialization: any = {};
  isVendor:boolean=false;
  userInfo:any={};
  constructor(private route: Router,private vendorRegistrationService : VendorRegistrationService,
    private utilitiesService:UtilitiesService, private toastService:ToastService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("userInfo")!=null)
    {
     this.userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
    this.isVendor=this.userInfo.userTypeId=="2" ? true : false;

    }
    else
    {
      this.isVendor=false;

    }
    this.SocialNetwork={socialNetworkID:"",socialNetworkName:"",socialNetworkURL:""}
    this.newRelation = {name: "", gender: "",relationShipName:""};
    this.RelationArray.push(this.newRelation);
    this.newSpecialization = {SpecializationName: ""};
    this.SpecializationArray.push(this.newSpecialization);
    this.gettitle();
    this.getCertifications();
    this.getSocialNetworks();
  }
  change(e, type){
    console.log(type);
    if(type.isChecked==true){
      this.selectedCertification.push(type);
    }
   }
   changeTitle(e,type)
   {
       console.log(type)
   }

  addRelation(index) {
    this.newRelation = {name: "", gender: "",relationShipName:""};
    this.RelationArray.push(this.newRelation);
    return true;
}
addSpecialization(index) {
  this.newSpecialization = {SpecializationName: ""};
  this.SpecializationArray.push(this.newSpecialization);
  return true;
}

deleteRelation(index) {
    if(this.RelationArray.length ==1) {
        return false;
    } else {
        this.RelationArray.splice(index, 1);
        return true;
    }
}
deleteSpecialization(index) {
  if(this.SpecializationArray.length ==1) {
      return false;
  } else {
      this.SpecializationArray.splice(index, 1);
      return true;
  }
}
saveVendor()
{
//   console.log(this.RelationArray);
//   console.log(this.SpecializationArray);
//   console.log(this.selectedCertification);

//   console.log(this.SocialNetwork);
  this.vendor.vendor_Height=Number(this.vendor.vendor_Height);
  this.vendor.vendor_Weight=Number(this.vendor.vendor_Weight);
  this.vendor.vendor_Age=Number(this.vendor.vendor_Age);
  this.vendor.titleID=Number(this.vendor.titleID);
  this.vendor.VendorCertifications=this.selectedCertification;
  this.vendor.VendorRelationShips=this.RelationArray;
  this.vendor.VendorSocialNetworks=this.SocialNetwork;
  this.vendor.VendorSpecializations=this.SpecializationArray;
  console.log(this.vendor);
 // this.SocialNetwork=this.SocialNetwork.filter(socialNetworkName);
  console.log(this.SocialNetwork);
  //this.SocialNetwork = this.SocialNetwork.filter(item => item !='socialNetworkName' );
 // console.log(this.SocialNetwork);
  this.vendorRegistrationService.SaveVendor(this.vendor).subscribe(
    (data) => {
        if (data) {
          if(data=="1")
          {
          this.vendor={};
          this.showError('Registration done Successfully.')
          }
          else
          {
            this.showError('Registration Failed !, Please try after some time')
           console.log("DB Exception");
          }
        }
    },
    (error) => {
        this.showError('Registration Failed !, Please try after some time')
        this.errorMessage = error;
    },
    () => {
    }
  );

}
showError(msg) {
  this.toastService.show(msg, {
    classname: 'bg-danger text-light',
    delay: 5000 ,
    autohide: true,
    headertext: 'Registration!'
  });
}
  gettitle()
  {

    this.utilitiesService.getTitle().subscribe(
      (data) => {
          if (data) {
              this.Title = data;
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
getCertifications()
{

  this.utilitiesService.getCertification().subscribe(
    (data) => {
        if (data) {
            this.Certification = data;
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
getSocialNetworks()
{
  this.utilitiesService.getSocialNetwork().subscribe(
    (data) => {
        if (data) {
            this.SocialNetwork = data;
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

}
export class DynamicGrid{
  Name:string;
  Gender:string;
  Relation:string;
}
export class DynamicGrid1{
  Specialization:string;

}
