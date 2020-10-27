import { Component, OnInit} from '@angular/core';
import {AdminServiceTypeService} from './adminservicetype.service';
import {Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { elementAt } from 'rxjs/internal/operators/elementAt';

@Component({
  selector: 'app-adminservicetype',
  templateUrl: './adminservicetype.component.html',
  styleUrls: ['./adminservicetype.component.css']
})
export class AdminservicetypeComponent implements OnInit {
  errorMessage:any;
  serviceTypeModel:any={};
  cities:any;
  serviceTypeDetails:any;
  fileToUpload: File = null;
  imageURL: any;
 length:number;
 byte:any=[];
 byteArrays:any=[];
 btntext:any;
 //formData:FormData;
 //serviceTypeForm:FormData;
 UploadedFile:File;
 base64Image:any;
 uploadForm: FormGroup;base64textString:string;
 selectedIndex:any;
 constructor(
  private adminServiceTypeService : AdminServiceTypeService,private route: Router,
  private domSanitizer:DomSanitizer
) { }

  ngOnInit(): void {
    this.getCity();
    this.getServicetype();
    this.btntext="Save";
    //serviceTypeForm:
  }
  onEdit(index: any)
  {
    this.btntext="Update";
    console.log(index);
     var ArrayBuffer=index.serviceTypeImage;
     this.imageURL = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + ArrayBuffer);
     console.log(this.imageURL);
     //this.UploadedFile=this.imageURL;
     this.serviceTypeModel.serviceTypeID=index.serviceTypeID;
    this.serviceTypeModel.serviceTypeName=index.serviceTypeName;
    this.serviceTypeModel.serviceTypeImage=index.serviceTypeImage;
    this.serviceTypeModel.cityID=index.cityID;
  }

  onDelete(index:any)
  {
    this.serviceTypeModel.serviceTypeID=index.serviceTypeID;
    this.serviceTypeModel.cityID=index.cityID;
    console.log(this.serviceTypeModel)
    this.adminServiceTypeService.DeleteServiceType(this.serviceTypeModel).subscribe(
      (data) => {
          if (data) {
              var c= data;
              alert('Service Type Deleted Successfully...');
              this.ngOnInit();
          }
      },
      (error) => {
          this.errorMessage = error;
      },
      () => {
      }
    );
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
showPreview(event) {
  const file = (event.target as HTMLInputElement).files[0];
  console.log(file.name)
  this.imageURL=file.name;
  console.log(this.imageURL) ;
  // File Preview
  const reader = new FileReader();
  reader.onload = () => {
    this.imageURL = reader.result as string;
  }
  reader.readAsDataURL(file)
}

  AddServiceType()
  {
    if (this.UploadedFile == null || this.UploadedFile == undefined) {
      alert("Please upload a file");
      return;
    }
    const formData=new FormData();
    if( this.btntext=="Save")
    {
      formData.append('action','Save');

    }
    if( this.btntext=="Update")
    {

      formData.append('action','Update');

    }
    if(this.serviceTypeModel.serviceTypeID=='')
    {
      formData.append('ServiceTypeID','');
    }
    else{
      formData.append('ServiceTypeID',this.serviceTypeModel.serviceTypeID);
    }

    formData.append('serviceTypeImage', this.UploadedFile, this.UploadedFile.name);
    formData.append('ServiceTypeName',this.serviceTypeModel.serviceTypeName);
    formData.append('CityID',this.serviceTypeModel.cityID);

    this.adminServiceTypeService.SaveServiceType(formData).subscribe(
      (data) => {
          if (data) {
              var c= data;
              if(this.btntext=="Save")
              {
                alert('Service Type Saved Successfully...')
              }
              if(this.btntext=="Update")
              {
                alert('Service Type Updated Successfully...')
              }
              this.btntext="Save";
              //this.serviceTypeForm.reset();
             // formData=null
              this.ngOnInit();
              // this.serviceTypeModel.serviceTypeName='';
              // this.serviceTypeModel.cityID='';
              // this.serviceTypeModel.serviceTypeImage='';
              // this.imageURL ='';
              // formData.append('ServiceTypeID','');
              // formData.append('serviceTypeImage', '');
              // formData.append('ServiceTypeName','');
              // formData.append('CityID','');
              // this.getServicetype();
          }
      },
      (error) => {
          this.errorMessage = error;
      },
      () => {
      }
    );

  }
  getCity()
  {

    this.adminServiceTypeService.getCities().subscribe(
      (data) => {
          if (data) {
              this.cities = data;
          }
      },
      (error) => {
          this.errorMessage = error;
      },
      () => {

      }

  );
}
getServicetype()
{

  this.adminServiceTypeService.getServiceType().subscribe(
    (data) => {
        if (data) {
            this.serviceTypeDetails = data;
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
