import { Component, OnInit} from '@angular/core';
import {AdminBlogService} from './adminblog.service';
import 'quill-emoji/dist/quill-emoji.js';
import {Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { elementAt } from 'rxjs/internal/operators/elementAt';
import {ToastService} from '../shared/services/toastservice';
import { UtilitiesService } from '../shared/services/utilities.service';

@Component({
  selector: 'app-adminblog',
  templateUrl: './adminblog.component.html',
  styleUrls: ['./adminblog.component.css']
})
export class AdminblogComponent implements OnInit {
  errorMessage:any;
  blogModel:any={};
  modules = {};
  blogDetails:any;
  fileToUpload: File = null;
  imageURL: any;
 length:number;
 byte:any=[];
 byteArrays:any=[];
 btntext:any;
 myForm: any;
 //formData:FormData;
 //serviceTypeForm:FormData;
 UploadedFile:File;
 base64Image:any;
 uploadForm: FormGroup;base64textString:string;
 selectedIndex:any;
 constructor(
  private adminBlogService : AdminBlogService,private route: Router,
  private domSanitizer:DomSanitizer,private toastService:ToastService
) { }

  ngOnInit(): void {
   
    this.getBlog();
    this.btntext="Save";
    //blogForm:
  }
  onEdit(index: any)
  {
    this.btntext="Update";
    console.log(index);
     var ArrayBuffer=index.blogImage;

     this.imageURL = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + ArrayBuffer);
     console.log(this.imageURL);
     //this.UploadedFile=this.imageURL;
     this.blogModel.blogID=index.blogID;
    this.blogModel.blogTitle=index.blogTitle;
    this.blogModel.blogImage=index.blogImage;
    
    this.blogModel.description=index.description;
    this.blogModel.createdBy=index.createdBy;
   
  }

  onDelete(index:any)
  {
    this.blogModel.blogID=index.blogID;
    
    console.log(this.blogModel)
    this.adminBlogService.DeleteBlog(this.blogModel).subscribe(
      (data) => {
          if (data) {
              var c= data;
              this.showError('Blog Deleted Successfully...');
             // this.ngOnInit();
             this.imageURL="";
             this.getBlog();
             this.blogModel={};
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

  AddBlog()
  {
    if (this.UploadedFile == null || this.UploadedFile == undefined) {
      this.showError("Please upload a file");
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
    if(this.blogModel.blogID=='')
    {
      formData.append('BlogID','');
    }
    else{
      formData.append('BlogID',this.blogModel.blogID);
    }

    formData.append('blogImage', this.UploadedFile, this.UploadedFile.name);
    formData.append('BlogTitle',this.blogModel.blogTitle);
    
    formData.append('Description',this.blogModel.description);
    formData.append('CreatedBy',this.blogModel.createdBy);

    this.adminBlogService.SaveBlog(formData).subscribe(
      (data) => {
          if (data) {
              var c= data;
              if(this.btntext=="Save")
              {
                this.showError('Blog Saved Successfully...')
              }
              if(this.btntext=="Update")
              {
                this.showError('Blog Updated Successfully...')
              }
              this.btntext="Save";
              this.imageURL="";
              this.getBlog();
              this.blogModel={};
          }
      },
      (error) => {
          this.errorMessage = error;
      },
      () => {
      }
    );

  }
  
getBlog()
{

  this.adminBlogService.getBlog().subscribe(
    (data) => {
        if (data) {
            this.blogDetails = data;
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
    headertext: 'Blog Details!'
  });
}
}
