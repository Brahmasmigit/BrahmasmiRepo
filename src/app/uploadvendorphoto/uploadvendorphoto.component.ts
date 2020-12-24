import { Component, OnInit,ViewChild } from '@angular/core';
import {ToastService} from '../shared/services/toastservice';
import { NgForm } from '@angular/forms';
import {UploadVendorPhotoService} from '../uploadvendorphoto/UploadVendorPhoto.service';
@Component({
  selector: 'app-uploadvendorphoto',
  templateUrl: './uploadvendorphoto.component.html',
  styleUrls: ['./uploadvendorphoto.component.css']
})
export class UploadvendorphotoComponent implements OnInit {
  imageURL:any;UploadedFile:any;errorMessage:any;
  vendorID:any; isLogin:boolean=false;
  isVendor:boolean=false;
  userInfo:any={};vendorname:any;
  @ViewChild('vendorphotouploadForm')myForm: NgForm;
  constructor(private toastService:ToastService,private uploadVendorPhotoService:UploadVendorPhotoService) { }

  ngOnInit(): void {
  
    if(sessionStorage.getItem("userInfo")!=null)
    {
        this.isLogin=true;
        this.userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
        console.log(this.userInfo.name)
        this.vendorname=this.userInfo.name;
        this.vendorID=this.userInfo.userId;
        this.isVendor=this.userInfo.userTypeId=="2" ? true : false;

    }
   else
   {
     this.isLogin=false;
   }
  }
  upload(event)
  {
    const file = (event.target as HTMLInputElement).files[0];
   // this.UploadedFile=files[0].name;
    this.UploadedFile = event.target.files[0];
    console.log(this.UploadedFile)
    const reader = new FileReader();
     reader.onload = () => {
       this.imageURL = reader.result as string;
     }
     reader.readAsDataURL(file)
  }
  UploadAPhoto()
  {
    if (this.UploadedFile == null || this.UploadedFile == undefined) {
      this.showError("Please upload a file");
      return;
    }
    const formData=new FormData();
    formData.append('vendor_Photo', this.UploadedFile, this.UploadedFile.name);
    formData.append('vendorID',this.vendorID);
    this.uploadVendorPhotoService.UploadPhoto(formData).subscribe(
      (data) => {
          if (data) {
              var c= data;
            
                this.showError('Your Photo Uploaded Successfully...')
                this.imageURL="";
                this.UploadedFile=null;
                this.myForm.resetForm();
             
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
      delay: 4000 ,
      autohide: true,
      headertext: 'Vendor Details!'
    });
  }
}
