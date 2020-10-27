import { Component, OnInit , ViewChild,  ElementRef  } from '@angular/core';
import {Router } from '@angular/router';
import {VendorRegistrationService} from './vendorregistration.service';
import {UtilitiesService} from '../shared/services/utilities.service';
import {VendorEnquiryService} from '../vendorenquiry/vendorenquiry.service';
import {ToastService} from '../shared/services/toastservice';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
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
  vendorEnquiryID:any;
  vendorEnquiryData:any;City:any;
  show:any;certified:any;nonCertified:any;
  btnText:string;vendorID:number;
  closeResult: string;
  @ViewChild('mymodal') mymodal: ElementRef;
  //form:ngForm;
  constructor(private route: Router,private vendorRegistrationService : VendorRegistrationService,
    private vendorEnquiryService : VendorEnquiryService,
    private  modalService: NgbModal,
    private utilitiesService:UtilitiesService, private toastService:ToastService) {
     // this.vendor.titleID = this.Title[0];
     }

  ngOnInit(): void {
    if(sessionStorage.getItem("userInfo")!=null)
    {
     this.userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
    this.isVendor=this.userInfo.userTypeId=="2" ? true : false;
    this.btnText="Update";
    this.vendorID=Number(this.userInfo.userId);
    //this.vendorID=4002;

    }
    else
    {
      this.isVendor=false;
      this.btnText="Register";
      this.getVendorEnquiryInfo();
    }
    //----TO Register----

    // this.btnText="Register";
    // this.vendorEnquiryID=sessionStorage.getItem("EnquiryID")
    // console.log(this.vendorEnquiryID)
    // this.getVendorEnquiryInfo(this.vendorEnquiryID)

    //----end-----
    //-------To Update Vendor Profile----
    //this.btnText="Update";
    //this.vendorID=Number(sessionStorage.getItem("VendorID"));
    //this.vendorID=4002;

    //-------End-------------
    this.getAllCity();
   // this.vendor_CityID=this.vendorEnquiryData.cityID;
    this.SocialNetwork={socialNetworkID:"",socialNetworkName:"",socialNetworkURL:""}
    this.newRelation = {name: "", gender: "",relationShipName:""};
    this.RelationArray.push(this.newRelation);
    this.newSpecialization = {SpecializationName: ""};
    this.SpecializationArray.push(this.newSpecialization);
    this.gettitle();
    this.getCertifications();
    this.getSocialNetworks();
  }
  getVendorEnquiryInfo()
  {
    if(sessionStorage.getItem("vendorenquiry")!=null)
    {

      var vendorenquiry:any={};
      vendorenquiry=JSON.parse(sessionStorage.getItem("vendorenquiry"));
      this.vendor.vendor_FirstName=vendorenquiry.name;
      this.vendor.cityID=vendorenquiry.cityID;
      this.vendor.vendor_EmailID=vendorenquiry.emailID;
      this.vendor.vendor_MobileNumber=vendorenquiry.mobileNumber;
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
  onCertChange(value)
  {
    //alert(value)
  if(value=='certified')
  {

    this.show=true;
  }
  else
  {
    this.show=false;
  }
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
openPaymentPopup()
{
this.placeOrder(this.mymodal);
}
saveVendor()
{
if(this.btnText=="Register")
{


if(this.vendor.vendor_Height!='')
{
  this.vendor.vendor_Height=Number(this.vendor.vendor_Height);
}
if(this.vendor.vendor_Weight!='')
{
  this.vendor.vendor_Weight=Number(this.vendor.vendor_Weight);
}
if(this.vendor.vendor_Age!='')
{
  this.vendor.vendor_Age=Number(this.vendor.vendor_Age);
}
if(this.vendor.titleID!='')
{
  this.vendor.titleID=Number(this.vendor.titleID);
}
  this.vendor.VendorCertifications=this.selectedCertification;
  this.vendor.VendorRelationShips=this.RelationArray;
 this.vendor.VendorSocialNetworks=this.SocialNetwork;
 this.vendor.VendorSpecializations=this.SpecializationArray;
  console.log(this.vendor);
  this.vendorRegistrationService.SaveVendor(this.vendor).subscribe(
    (data) => {
        if (data) {
          this.modalService.dismissAll("done");
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
  if(this.btnText=="Update")
  {
    this.vendor.vendorID=this.vendorID;
    this.vendor.cityID=Number(this.vendor.cityID);
    if(this.vendor.vendor_Height!='')
    {
      this.vendor.vendor_Height=Number(this.vendor.vendor_Height);
    }
    if(this.vendor.vendor_Weight!='')
    {
      this.vendor.vendor_Weight=Number(this.vendor.vendor_Weight);
    }
    if(this.vendor.vendor_Age!='')
    {
      this.vendor.vendor_Age=Number(this.vendor.vendor_Age);
    }
    if(this.vendor.titleID!='')
    {
      this.vendor.titleID=Number(this.vendor.titleID);
    }
      this.vendor.VendorCertifications=this.selectedCertification;
      this.vendor.VendorRelationShips=this.RelationArray;
     this.vendor.VendorSocialNetworks=this.SocialNetwork;
     this.vendor.VendorSpecializations=this.SpecializationArray;
      console.log(this.vendor);
      this.vendorRegistrationService.UpdateVendor(this.vendor).subscribe(
        (data) => {
            if (data) {
              if(data=="1")
              {
              this.vendor={};
              this.showError('Profile Updated Successfully.')
              }
              else
              {
                this.showError('Profile Update Failed !, Please try after some time')
               console.log("DB Exception");
              }
            }
        },
        (error) => {
            this.showError('Profile Update Failed !, Please try after some time')
            this.errorMessage = error;
        },
        () => {
        }
      );
  }
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
              this.vendor.titleID=data[0].titleID;
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
placeOrder(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass : "xlModalvendor"}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {

  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
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
