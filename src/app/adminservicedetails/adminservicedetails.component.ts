import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminServiceDetailsService } from './adminservicedetails.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup ,FormsModule} from "@angular/forms";
import 'quill-emoji/dist/quill-emoji.js';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import {ToastService} from '../shared/services/toastservice';
@Component({
  selector: 'app-adminservicedetails',
  templateUrl: './adminservicedetails.component.html',
  styleUrls: ['./adminservicedetails.component.css']
})
export class AdminservicedetailsComponent implements OnInit {
  errorMessage: any;
  serviceModel: any = {};
  serviceDetails: any;
  ServiceTypes: any;
  fileToUpload: File = null;
  imageURL: any;
  uploadForm: FormGroup;
  modules = {};
  content = '';
  Cities:any;
  UploadedFile:File;
 base64Image:any;
 btntext:string;
 serviceForm:FormGroup;
 selectedIndex:any;
 constructor(private adminServiceDetailsService: AdminServiceDetailsService, private route: Router,
  private domSanitizer:DomSanitizer,private formBuilder:FormBuilder,private toastService:ToastService) {
  this.addModules();
}

  ngOnInit(): void {
    this.getServices();
    this.getServicetype();
    this.btntext="Save";
  }
  selectServiceType(id: number) {
    console.log(id);
    this.getCities(id);
  }
  upload(event)
{
  const file = (event.target as HTMLInputElement).files[0];
 // this.UploadedFile=files[0].name;
  this.UploadedFile = event.target.files[0];
  console.log(this.UploadedFile)
  console.log(this.UploadedFile.name)
  const reader = new FileReader();
   reader.onload = () => {
     this.imageURL = reader.result as string;
   }
   reader.readAsDataURL(file)
}
onEdit(index: any)
{
  console.log(index);
   var ArrayBuffer=index.serviceImage;
    // console.log(ArrayBuffer.length);
   this.imageURL = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + ArrayBuffer);
   //this.UploadedFile.name=index.
   this.serviceModel.serviceTypeID=index.serviceTypeID;
   //console.log(this.serviceModel.serviceTypeID);
  this.serviceModel.serviceName=index.serviceName;
  this.serviceModel.serviceImage=index.serviceImage;

  this.getCities(this.serviceModel.serviceTypeID);
  this.serviceModel.cityID=index.cityID;
  //console.log(this.serviceModel.cityID);
  this.serviceModel.serviceID=index.serviceID;
  this.serviceModel.service_Short_Description=index.service_Short_Description;
  this.serviceModel.service_Long_Description=index.service_Long_Description;
  this.btntext="Update";
}
onDelete(index:any)
{
  this.serviceModel.serviceID=index.serviceID;
  this.serviceModel.cityID=index.cityID;

  console.log(this.serviceModel)
  this.adminServiceDetailsService.DeleteService(this.serviceModel).subscribe(
    (data) => {
        if (data) {
            var c= data;
            this.showError('Service Deleted Successfully...')
            //this.ngOnInit();
            this.getServices();
            this.serviceModel={};
            this.imageURL="";
        }
    },
    (error) => {
        this.errorMessage = error;
    },
    () => {
    }
  );
}

  AddService()  {
    /*if (this.UploadedFile == null || this.UploadedFile == undefined) {
      this.showError("Please upload a file");
      return;
    }*/
      console.log(this.serviceModel);

    console.log('rich data', this.serviceModel.service_Short_Description);
    const formData=new FormData();
    if( this.btntext=="Save")
    {
      formData.append('action','Save');

    }
    if( this.btntext=="Update")
    {

      formData.append('action','Update');

    }
    if(this.serviceModel.serviceID=='')
    {
      formData.append('serviceID','');
    }
    else{
      formData.append('ServiceID',this.serviceModel.serviceID);
    }
    formData.append('serviceImage', this.UploadedFile);
    formData.append('serviceTypeID',this.serviceModel.serviceTypeID);
    formData.append('cityID',this.serviceModel.cityID);
    formData.append('serviceName',this.serviceModel.serviceName);
    formData.append('serviceShortDescription',this.serviceModel.service_Short_Description);
    formData.append('serviceLongDescription',this.serviceModel.service_Long_Description);


    //this.serviceModel.serviceTypeID = Number(this.serviceModel.serviceTypeID);
    //this.serviceTypeModel.cityIDthis.fileUploadForm.get('serviceTypeImage').value
    console.log(this.serviceModel)
    this.adminServiceDetailsService.SaveService(formData).subscribe(
      (data) => {
        if (data) {
          var c = data;
          if(this.btntext=="Save")
          {
            this.showError('Service Saved Successfully...')
          }
          if(this.btntext=="Update")
          {
            this.showError('Service Updated Successfully...')
          }
          this.btntext="Save";
          //this.ngOnInit();
          this.getServices();
          this.serviceModel={};
          this.UploadedFile =null;
          this.imageURL="";
        }
      },
      (error) => {
        this.errorMessage = error;
      },
      () => {
      }
    );
  }

  getServices() {
    this.adminServiceDetailsService.getService().subscribe(
      (data) => {
        if (data) {
          this.serviceDetails = data;
          console.log(this.serviceDetails)
        }
      },
      (error) => {
        this.errorMessage = error;
      },
      () => {

      }

    );
  }
  getCities(serviceTypeId) {
    this.adminServiceDetailsService.getServiceTypeCity(serviceTypeId).subscribe(
      (data) => {
        if (data) {
          this.Cities = data;
        }
      },
      (error) => {
        this.errorMessage = error;
      },
      () => {

      }

    );
  }

  getServicetype() {

    this.adminServiceDetailsService.getServiceTypes().subscribe(
      (data) => {
        if (data) {
          this.ServiceTypes = data;
        }
      },
      (error) => {
        this.errorMessage = error;
      },
      () => {

      }

    );
  }

  addModules() {
    this.modules = {
      'emoji-shortname': true,
      'emoji-textarea': true,
      'emoji-toolbar': true,
      'toolbar': [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean'],                                         // remove formatting button

        ['link', 'image', 'video'],                         // link and image, video
        ['emoji']

      ]
    }
  }
  showError(msg) {
    this.toastService.show(msg, {
      classname: 'bg-info text-light',
      delay: 4000 ,
      autohide: true,
      headertext: 'Service Details!'
    });
  }
}
