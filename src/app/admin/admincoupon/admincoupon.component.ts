import { Component, OnInit } from '@angular/core';
import {AdminCouponService} from './admincoupon.service';
import { DatePipe } from '@angular/common';
import {ToastService} from '../../shared/services/toastservice';
@Component({
  selector: 'app-admincoupon',
  templateUrl: './admincoupon.component.html',
  styleUrls: ['./admincoupon.component.css']
})
export class AdmincouponComponent implements OnInit {
  couponDetails:any;
  couponModel:any={};
  todayDate:Date = new Date();
  errorMessage:any;btntext:string;
  constructor(private adminCouponService:AdminCouponService,public datepipe: DatePipe,private toastService:ToastService,) { }

  ngOnInit(): void {
    this.getCouponDetails();
    this.btntext="Save";
  }
  onEdit(index: any)
  {
    this.couponModel.couponID=index.couponID;
    this.couponModel.couponCode=index.couponCode;
    this.couponModel.couponDiscount=index.couponDiscount;

    this.couponModel.couponExpiryDate=this.datepipe.transform(index.couponExpiryDate, 'yyyy-MM-dd');
    console.log(index.couponExpiryDate)
    this.couponModel.couponDescription=index.couponDescription;
    this.btntext="Update";
  }
  onDelete(index:any)
  {
    this.couponModel.couponID=index.couponID;
    console.log(this.couponModel)
    this.adminCouponService.DeleteCoupon(this.couponModel).subscribe(
      (data) => {
          if (data) {
              var c= data;
              this.showError('Coupon Deleted Successfully...')

              //this.ngOnInit();
              this.getCouponDetails();
              this.couponModel={};
          }
      },
      (error) => {
          this.errorMessage = error;
      },
      () => {
      }
    );
  }
  AddCoupon()
  {
    if( this.btntext=="Save")
    {
      this.couponModel.action='Save';
      this.couponModel.couponID=0;
    }
    if( this.btntext=="Update")
    {
      this.couponModel.action='Update';
      this.couponModel.couponID=Number(this.couponModel.couponID);
    }
    console.log(this.couponModel.couponID)

    console.log(this.couponModel)
    this.adminCouponService.SaveCoupon(this.couponModel).subscribe(
      (data) => {
        if (data) {
          var c = data;
          if(this.btntext=="Save")
          {
            this.showError('Coupon Details are Saved Successfully...')
          }
          if(this.btntext=="Update")
          {
            this.showError('Coupon Details are Updated Successfully...')
          }
          this.btntext="Save";
          this.getCouponDetails();
          this.couponModel={};
         //this.serviceForm.reset();
        }
      },
      (error) => {
        this.errorMessage = error;
      },
      () => {
      }
    );
  }
  getCouponDetails()
  {
    this.adminCouponService.getCoupons().subscribe(
      (data) => {
          if (data) {
              this.couponDetails = data;
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
      headertext: 'Coupon details!'
    });
  }
}
