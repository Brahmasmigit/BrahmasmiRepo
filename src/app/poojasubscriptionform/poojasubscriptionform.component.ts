import { Component, OnInit,ViewChild } from '@angular/core';
import {poojasubscriptionformService} from '../poojasubscriptionform/poojasubscriptionform.service';
import {Router,ActivatedRoute } from '@angular/router';
import {ToastService} from '../shared/services/toastservice';
import {UtilitiesService} from '../shared/services/utilities.service';
import { NgForm } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-poojasubscriptionform',
  templateUrl: './poojasubscriptionform.component.html',
  styleUrls: ['./poojasubscriptionform.component.css']
})
export class poojasubscriptionformComponent implements OnInit {
  btnText:string;
  subscription:any={};
  poojaModel:any={};
  subscriptionID:any;
  Services:any;
  errorMessage:any;
  timeperiod:any=[];
  poojaservices: any;
  Subscriptions:any;selectedServices:any=[];
  @ViewChild('poojasubscriptionForm') myForm: NgForm;
  constructor(
    private poojasubscriptionformService : poojasubscriptionformService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,private utilitiesService:UtilitiesService
  ) { }
  ngOnInit(): void {
    this.timeperiod=[
      { timeperiodName: "Monthly" },
      { timeperiodName: "Quarterly" },
      { timeperiodName: "HalfYearly" },
      { timeperiodName: "Yearly" }
     ]
    this.btnText="Submit";
    this.getSubscriptionForm();
    this.getPoojaServices();
    this.poojaModel.timeperiod();
  }
  change(e, type){
    console.log(type);
    if(type.isChecked==true){
      this.selectedServices.push(type);
    }
   }
  getSubscriptionForm()
  {
    this.poojasubscriptionformService.getSubscriptionForm().subscribe(
      (data) => {
          if (data) {
              this.Subscriptions = data;
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
getPoojaServices()
  {
    this.poojasubscriptionformService.getPoojaServices().subscribe(
      (data) => {
          if (data) {
              this.poojaservices = data;
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
poojasubscriptionform()
  {
    console.log(this.poojaModel);

    this.poojaModel.subscriptionCategoryID=Number(this.poojaModel.subscriptionCategoryID);
    this.poojaModel.PoojaService=this.selectedServices;
    // console.log(this.poojaModel);
     this.poojasubscriptionformService.FormRegister(this.poojaModel).subscribe(
       (data) => {
           if (data) {
               if(data=="1")
               {
                 console.log(data)
                 this.myForm.resetForm();
               this.showError('Successfully Submitted ...')
               this.poojaModel={};
               }
               else
               {
                 this.showError('Your query is not sent, Please try after some time')
               console.log("DB Exception");
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
showError(msg) {
  this.toastService.show(msg, {
    classname: 'bg-info text-light',
    delay: 5000 ,
    autohide: true,
    headertext: 'Contact details!'
  });
}
}
