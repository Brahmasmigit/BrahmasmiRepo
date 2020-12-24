import { Component, OnInit, ViewChild} from '@angular/core';
import {VendorProfileService} from './VendorProfile.service';
import {Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { elementAt } from 'rxjs/internal/operators/elementAt';
import {ToastService} from '../shared/services/toastservice';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-vendorprofile',
  templateUrl: './vendorprofile.component.html',
  styleUrls: ['./vendorprofile.component.css']
})
export class VendorprofileComponent implements OnInit {
vendor:any={};vendorID:any;errorMessage:any;userInfo:any={};
@ViewChild('concernenquiryForm')myForm: NgForm;
  constructor(private vendorProfileService:VendorProfileService,private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("userInfo")!=null)
    {
      this.userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
      console.log(this.userInfo.name)
      if(this.userInfo.userTypeId=="2" ||this.userInfo.userTypeId=="5" )
      {
        this.vendorID=this.userInfo.userId;
       
        this.GetVendorProfile(this.vendorID);
      }
      else
      {
        this.router.navigate(['/login']);
      }

    }
    else
    if(  this.activatedRoute.snapshot.params['vendorId']!=null)
    {
      this.vendorID=this.activatedRoute.snapshot.params['vendorId'];
    }
    else
    {
      this.router.navigate(['/login']);
    }

  }
  GetVendorProfile(VendorID)
  {

    this.vendorProfileService.GetVendorProfile(VendorID).subscribe(
      (data) => {
          if (data) {
              this.vendor = data;
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
