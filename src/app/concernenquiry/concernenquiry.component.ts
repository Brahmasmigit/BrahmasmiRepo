import { Component, OnInit, ViewChild} from '@angular/core';
import {ConcernEnquiryService} from './ConcernEnquiry.service';
import {Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { elementAt } from 'rxjs/internal/operators/elementAt';
import {ToastService} from '../shared/services/toastservice';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-concernenquiry',
  templateUrl: './concernenquiry.component.html',
  styleUrls: ['./concernenquiry.component.css']
})
export class ConcernenquiryComponent implements OnInit {
  ConcernTypes:any;concernModel:any={};errorMessage:any;
  constructor( private concernEnquiryService : ConcernEnquiryService,private route: Router,
    private domSanitizer:DomSanitizer,private toastService:ToastService) { }
@ViewChild('concernenquiryForm')myForm: NgForm;
  ngOnInit(): void {
    this.getConcernTypes();
  }
  AddConcernDetails()
  {
    this.concernModel.concernID=Number(this.concernModel.concernID);
    console.log(this.concernModel);
    this.concernEnquiryService.AddConcernDetails(this.concernModel).subscribe(
      (data) => {
          if (data) {
              if(data=="1")
              {
                console.log(data)
                this.myForm.resetForm();
              this.showError('Successfully Submitted ...')
              this.concernModel={};
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
  getConcernTypes()
  {

    this.concernEnquiryService.getConcernTypes().subscribe(
      (data) => {
          if (data) {
              this.ConcernTypes = data;
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
    delay: 5000 ,
    autohide: true,
    headertext: 'Concern Enquiry details!'
  });
}
}
