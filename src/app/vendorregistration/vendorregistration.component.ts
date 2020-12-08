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
  selectedEducation=[];
  selectedLanguages=[];
  selectedCertification = [];
  selectedIndustryType = [];
  vendorVirtualPlatForm:any={};
  vendorSocialNetwork:any={};
  Title:any=[];Certification:any=[];SocialNetwork:any=[];VirtualPlatForms:any=[];IndustryTypes = [];
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
  Country:any;State:any;Education:any;Languages:any;IndustryType:any;VideoCallPlatForms:any=[];
  showPassport:any;
  UploadedFile:File;
  userTypes:any=[];
  LanguageArray:any=[];
  @ViewChild('mymodal') mymodal: ElementRef;
  //form:ngForm;
  constructor(private route: Router,private vendorRegistrationService : VendorRegistrationService,
    private vendorEnquiryService : VendorEnquiryService,
    private  modalService: NgbModal,
    private utilitiesService:UtilitiesService, private toastService:ToastService) {
     // this.vendor.titleID = this.Title[0];
     }

  ngOnInit(): void {
    this.SocialNetwork={socialNetworkID:"",socialNetworkName:"",socialNetworkURL:""}
    this.VirtualPlatForms={virtualPlatformID:"",virtualPlatformName:"",videoCallPlatformLink:""}
    this.newRelation = {name: "", gender: "",relationShipName:""};
    this.RelationArray.push(this.newRelation);
    this.newSpecialization = {specializationName: ""};
    this.SpecializationArray.push(this.newSpecialization);
    this.getCountries();

    this.gettitle();
    this.getCertifications();
    this.getSocialNetworks();
    this.getEducationDetails();
    this.getLanguages();
    this.getIndustryType();
    this.getVirtualPlatform();
    this.btnText="Register";
    this.userTypes=[
      { userTypeID: 2, userTypeName: "Pandit" },
      { userTypeID: 5, userTypeName: "Astrologer" },
      { userTypeID: 6, userTypeName: "Others" }
     ];
     this.vendor.userTypeID=this.userTypes[0].userTypeID;
     if(sessionStorage.getItem("vendorenquiry")!=null)
     {
       this.getState(1);
       this.getCity(0);
       this.getVendorEnquiryInfo();

     }


   // if(sessionStorage.getItem("userInfo")!=null)
  //  {
    // this.userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
   // this.isVendor=this.userInfo.userTypeId=="2" ? true : false;
    //this.btnText="Update";
   // this.vendorID=Number(this.userInfo.userId);
    //this.vendorID=4002;


   // }
    //else
    //{
     // this.isVendor=false;
     // this.btnText="Register";
     // this.userTypes=[
      //  { userTypeID: 2, userTypeName: "Pandit" },
      //  { userTypeID: 5, userTypeName: "Astrologer" },
      //  { userTypeID: 6, userTypeName: "Others" }
      // ];
     //  this.vendor.userTypeID=this.userTypes[0].userTypeID;


    //}


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
    //this.getAllCity();
   // this.vendor_CityID=this.vendorEnquiryData.cityID;

  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  getVendorEnquiryInfo()
  {
    if(sessionStorage.getItem("vendorenquiry")!=null)
    {

      var vendorenquiry:any={};
      vendorenquiry=JSON.parse(sessionStorage.getItem("vendorenquiry"));
      this.vendor.vendor_FirstName=vendorenquiry.name;
      //this.getCountries();
      this.vendor.countryID=vendorenquiry.countryId;

      this.vendor.countryName=vendorenquiry.countryName;
      //this.getState(vendorenquiry.countryId);
      this.vendor.stateID=vendorenquiry.stateID;

      this.vendor.stateName=vendorenquiry.stateName;
      this.vendor.cityID=vendorenquiry.cityID;
      this.vendor.cityName=vendorenquiry.cityName;


      this.vendor.vendor_EmailID=vendorenquiry.emailID;
      this.vendor.vendor_MobileNumber=vendorenquiry.mobileNumber;
      this.vendor.vendor_AlternateNumber=vendorenquiry.altMobileNumber;
      this.vendor.vendor_Address1=vendorenquiry.address1;
      this.vendor.vendor_Address2=vendorenquiry.address2;
      //this.vendor.vendor_DOB=this.datepipe.transform(vendorenquiry.dob, 'yyyy-MM-dd');

      this.vendor.vendor_Gothram=vendorenquiry.gothram;
      this.vendor.vendor_PinCode1=vendorenquiry.pinCode;
      this.vendor.vendor_Rishipravara=vendorenquiry.rishipravara;
      this.vendor.userTypeName=vendorenquiry.userTypeName;
      this.vendor.vendor_Vedashakha=vendorenquiry.vedashaka;




       this.vendor.userTypeID=vendorenquiry.userType;
console.log(this.Languages)
      //this.vendor.userTypeID=vendorenquiry.userType;



    }

  }
  getCity(stateID)
  {

    this.utilitiesService.getCities(stateID).subscribe(
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
   changeEducation(e,type)
   {
    console.log(type.educationID);
    this.vendor.EducationID=Number(type.educationID);
    if(type.isChecked==true){
      this.selectedEducation.push(type);

    }
   }
   changeLanguage(e,type)
   {
    console.log(type);
    if(type.isChecked==true){
      this.selectedLanguages.push(type);
    }
   }
   changeIndustryType(e,type)
   {
    console.log(type);
    if(type.isChecked==true){
      this.selectedIndustryType.push(type);
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
  this.newSpecialization = {specializationName: ""};
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
uploadPhoto(event)
{
  const file = (event.target as HTMLInputElement).files[0];
  this.UploadedFile = event.target.files[0];
  console.log(this.UploadedFile)
  const reader = new FileReader();
   reader.onload = () => {
     //this.imageURL = reader.result as string;
   }
   reader.readAsDataURL(file)
}
saveVendor()
{
if(this.btnText=="Register")
{
console.log(this.vendor.vendor_AnnualIncome)
//console.log(this.SpecializationArray[0].Specialization)
if(this.vendor.cityID==undefined ||this.vendor.stateID==undefined ||this.vendor.countryID==undefined || this.vendor.vendor_FirstName==undefined||this.vendor.vendor_Address1==undefined||this.vendor.vendor_MobileNumber==undefined||this.vendor.vendor_EmailID==undefined)
{
  this.showError("FirstName, Mobile, Email, City, Address1, Country, State, Language and Specialization are Mandatory fields")
  return;
}

if(this.vendor.vendor_Height!=undefined)
{
  this.vendor.vendor_Height=Number(this.vendor.vendor_Height);
}
if(this.vendor.vendor_Weight!=undefined)
{
  this.vendor.vendor_Weight=Number(this.vendor.vendor_Weight);
}
if(this.vendor.vendor_Age!=undefined)
{
  this.vendor.vendor_Age=Number(this.vendor.vendor_Age);
}
if(this.vendor.titleID!=undefined)
{
  this.vendor.titleID=Number(this.vendor.titleID);
}
console.log(this.vendor.countryID)
if(this.vendor.countryID!=''|| this.vendor.countryID!=undefined)
{
  this.vendor.countryID=Number(this.vendor.countryID);
}
if(this.vendor.stateID!=''|| this.vendor.stateID!=undefined)
{
  this.vendor.stateID=Number(this.vendor.stateID);
}
if(this.vendor.cityID!=''|| this.vendor.cityID!=undefined)
{
  this.vendor.cityID=Number(this.vendor.cityID);
}
if(this.vendor.Vendor_AnnualIncome!=undefined)
{
  this.vendor.vendor_AnnualIncome=Number(this.vendor.vendor_AnnualIncome);
}
if(this.vendor.userTypeID!=undefined)
{
  this.vendor.userTypeID=Number(this.vendor.userTypeID);
}
// if (this.UploadedFile == null || this.UploadedFile == undefined) {
//   this.vendor.vendor_Image=this.UploadedFile;
// }
//this.vendor.cityID=Number(this.vendor.cityID)
//this.vendor.VendorEducations=this.selectedEducation;
this.vendor.VendorLanguages=this.selectedLanguages;
this.vendor.VendorIndustryTypes=this.selectedIndustryType;
  this.vendor.VendorCertifications=this.selectedCertification;
  this.vendor.VendorRelationShips=this.RelationArray;
 this.vendor.VendorSocialNetworks=this.SocialNetwork;
 this.vendor.VendorVirtualPlatforms=this.VideoCallPlatForms;
 this.vendor.VendorSpecializations=this.SpecializationArray;
 this.vendor.VendorIndustryTypes=this.selectedIndustryType;
  console.log(this.vendor);
  this.vendorRegistrationService.SaveVendor(this.vendor).subscribe(
    (data) => {
        if (data) {

          let arrApplicationCode:any=[];
          arrApplicationCode=data;
          let checkresult = arrApplicationCode.find(x=> x.result==0);
          if(checkresult==null || checkresult==undefined)
          {
            if(arrApplicationCode[0].result==2)
            {
              this.showError('Pandit already Registered with this Mobile Number!');
              return;
            }
            let vendorinfo:any={};
            vendorinfo.applicationcode=arrApplicationCode[0].applicationNumber;
            vendorinfo.Name=this.vendor.vendor_FirstName;
            sessionStorage.setItem("vendorinfo",JSON.stringify(vendorinfo));
            this.route.navigate(['/vendorpayment']);
          }
          else
          {
            console.log("DB Exception");
            this.showError('Registration Failed !, Please try after some time')
          }

        }
    },
    (error) => {
        this.showError('Registration Failed !, Please try after some time')
        console.log(error);
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
    if(this.vendor.vendor_Height!=''|| this.vendor.vendor_Height!=undefined)
    {
      this.vendor.vendor_Height=Number(this.vendor.vendor_Height);
    }
    if(this.vendor.vendor_Weight!=''|| this.vendor.vendor_Height!=undefined)
    {
      this.vendor.vendor_Weight=Number(this.vendor.vendor_Weight);
    }
    if(this.vendor.vendor_Age!=''|| this.vendor.vendor_Age!=undefined)
    {
      this.vendor.vendor_Age=Number(this.vendor.vendor_Age);
    }
    if(this.vendor.titleID!=''|| this.vendor.titleID!=undefined)
    {
      this.vendor.titleID=Number(this.vendor.titleID);
    }
    console.log(this.vendor.countryID)
    if(this.vendor.countryID!=''|| this.vendor.countryID!=undefined)
    {
      this.vendor.countryID=Number(this.vendor.countryID);
    }
    if(this.vendor.stateID!=''|| this.vendor.stateID!=undefined)
    {
      this.vendor.stateID=Number(this.vendor.stateID);
    }
    if(this.vendor.cityID!=''|| this.vendor.cityID!=undefined)
    {
      this.vendor.cityID=Number(this.vendor.cityID);
    }

    this.vendor.VendorEducations=this.selectedEducation;
    this.vendor.VendorIndustryTypes=this.selectedIndustryType;
      this.vendor.VendorCertifications=this.selectedCertification;
      this.vendor.VendorRelationShips=this.RelationArray;
     this.vendor.VendorSocialNetworks=this.SocialNetwork;
     this.vendor.vendorVirtualPlatForm=this.VirtualPlatForms;
     this.vendor.VendorSpecializations=this.SpecializationArray;
     this.vendor.vendorVirtualPlatForm=this.selectedIndustryType;
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
onTravelChange(value)
{
  if(value=='yes')
  {

    this.showPassport=true;
  }
  else
  {
    this.showPassport=false;
  }
}

getEducationDetails()
{
  this.utilitiesService.getEducation().subscribe(
    (data) => {
        if (data) {
            this.Education = data;
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
getLanguages()
{
  this.utilitiesService.getlanguages().subscribe(
    (data) => {
        if (data) {
            this.Languages = data;
            console.log(data)
            if(sessionStorage.getItem("vendorenquiry")!=null)
            {
              console.log(this.Languages)
              var vendorenquiry1:any={};
              vendorenquiry1=JSON.parse(sessionStorage.getItem("vendorenquiry"));

              this.LanguageArray=vendorenquiry1.language.split(",");
              console.log(this.LanguageArray[0])
              for(var i=0;i<this.LanguageArray.length;i++)
              {
                for(var j=0;j<this.Languages.length;j++)
                {
                  if(this.LanguageArray[i]==this.Languages[j].languageName)
                  {
                    this.Languages[j].isChecked=true;
                  }
                }


              }

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
getIndustryType()
{
  this.utilitiesService.getIndustryTpes().subscribe(
    (data) => {
        if (data) {
            this.IndustryType = data;
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
getVirtualPlatform()
{
  this.utilitiesService.getVirtualPlatforms().subscribe(
    (data) => {
        if (data) {
            this.VideoCallPlatForms = data;
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
getCountries()
{
  this.utilitiesService.getCountries().subscribe(
    (data) => {
        if (data) {
            this.Country = data;
          //  this.vendor.countryID=data[0].countryID;
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
selectCountry(id: number) {
  this.getState(id);
}
selectState(id: number) {
  this.getCity(id);
}
getState(countryID)
{
  this.utilitiesService.getAllState(countryID).subscribe(
    (data) => {
        if (data) {
            this.State = data;
            console.log("StateData",data)
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

