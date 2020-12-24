import { Component, OnInit, ViewChild } from '@angular/core';
import {ContactUsService} from './contactus.service';
import {ToastService} from '../shared/services/toastservice';
import { NgForm } from '@angular/forms';
import {UtilitiesService} from '../shared/services/utilities.service';
import {Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  btnText:string;
  contact:any={};
  errorMessage:any;
  @ViewChild('contactUsForm') myForm: NgForm;
  constructor(
    private contactUsService : ContactUsService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private utilitiesService:UtilitiesService  ) { }

  ngOnInit(): void {
    this.btnText="Submit";
  }
  contactus()
  {


    console.log(this.contact);
       this.contactUsService.contactToWebsite(this.contact).subscribe(
         (data) => {
             if (data) {
                 if(data=="1")
                 {
                   console.log(data)
                   this.myForm.resetForm();
                 this.showError('Successfully Submitted ...')
                 this.contact={};
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
