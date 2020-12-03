import { Component, OnInit } from '@angular/core';
import {AdminLoyaltyPointsService} from './adminloyaltypoints.service';
import { DatePipe } from '@angular/common';
import {ToastService} from '../../shared/services/toastservice';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-adminloyaltypoints',
  templateUrl: './adminloyaltypoints.component.html',
  styleUrls: ['./adminloyaltypoints.component.css']
})
export class AdminloyaltypointsComponent implements OnInit {
  loyaltyDetails:any;
  errorMessage:any;
  loyaltyModel:any={};
  btntext:string;
  loyaltyForm:Form;
  constructor(private adminLoyaltyPointsService:AdminLoyaltyPointsService,public datepipe: DatePipe,private toastService:ToastService) { }

  ngOnInit(): void {
    this.getLoyaltyDetails();
    this.btntext="Save";
  }
  onEdit(index: any)
  {
    this.loyaltyModel.loyaltyID=index.loyaltyID;
    this.loyaltyModel.loyaltyType=index.loyaltyType;
    this.loyaltyModel.loyaltyPoints=index.loyaltyPoints;
    this.btntext="Update";
  }
  onDelete(index:any)
  {
    this.loyaltyModel.loyaltyID=index.loyaltyID;
    console.log(this.loyaltyModel)
    this.adminLoyaltyPointsService.DeleteLoyaltyPoints(this.loyaltyModel).subscribe(
      (data) => {
          if (data) {
              var c= data;
              this.showError('Loyalty Points are Deleted Successfully...')
              this.getLoyaltyDetails();
              this.loyaltyModel={};
          }
      },
      (error) => {
          this.errorMessage = error;
      },
      () => {
      }
    );
  }
  AddLoyalty()
  {
    console.log(this.loyaltyModel.loyaltyType)
    console.log(this.loyaltyModel.loyaltyPoints)
    if(this.loyaltyModel.loyaltyPoints==undefined ||this.loyaltyModel.loyaltyType==undefined || this.loyaltyModel.loyaltyType=="" )
    {
      return;
    }
    if(this.loyaltyModel.loyaltyPoints<=0)
    {
      this.showError('Loyalty points should be Greater than one')
      return;
    }
    if( this.btntext=="Save")
    {
      this.loyaltyModel.action='Save';
      this.loyaltyModel.loyaltyID=0;
    }
    if( this.btntext=="Update")
    {
      this.loyaltyModel.action='Update';
      this.loyaltyModel.loyaltyID=Number(this.loyaltyModel.loyaltyID);
    }
    console.log(this.loyaltyModel)
    this.adminLoyaltyPointsService.SaveLoyaltypoints(this.loyaltyModel).subscribe(
      (data) => {
        if (data) {
          var c = data;
          if(data==1)
          {
          if(this.btntext=="Save")
          {
            this.showError('Loyalty Details are Saved Successfully...')
          }
          if(this.btntext=="Update")
          {
            this.showError('Loyalty Details are Updated Successfully...')
          }
        }
        else if(data==2)
        {
          this.showError('Loyalty Type Already Added, Please Add new one')
        }
          this.btntext="Save";
          this.getLoyaltyDetails();
          this.loyaltyModel={};
        }
      },
      (error) => {
        this.errorMessage = error;
      },
      () => {
      }
    );
  }
  getLoyaltyDetails()
  {
    this.adminLoyaltyPointsService.getLoyaltyPoints().subscribe(
      (data) => {
          if (data) {
              this.loyaltyDetails = data;
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
  showError(msg) {
    this.toastService.show(msg, {
      classname: 'bg-info text-light',
      delay: 4000 ,
      autohide: true,
      headertext: 'Coupon details!'
    });
  }
}
