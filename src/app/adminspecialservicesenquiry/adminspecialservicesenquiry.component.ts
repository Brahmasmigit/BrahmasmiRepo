import { Component, OnInit,ViewChild } from '@angular/core';
import {adminspecialservicesenquiryService} from './adminspecialservicesenquiry.service';
import {Router,ActivatedRoute } from '@angular/router';
import {ToastService} from '../shared/services/toastservice';
import {UtilitiesService} from '../shared/services/utilities.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-adminspecialservicesenquiry',
  templateUrl: './adminspecialservicesenquiry.component.html',
  styleUrls: ['./adminspecialservicesenquiry.component.css']
})
export class adminspecialservicesenquiryComponent implements OnInit {
  btnText:string;
  Services:any;
  errorMessage:any;
  @ViewChild('adminspecialservicesenquiry') myForm: NgForm;
  constructor(
    private adminspecialservicesenquiryService : adminspecialservicesenquiryService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,private utilitiesService:UtilitiesService
  ) { }
  ngOnInit(): void {
    this.btnText="Submit";
    this.getAllSpecialServicesEnquiry();
 
  }

  getAllSpecialServicesEnquiry()
{
  this.adminspecialservicesenquiryService.getAllSpecialServicesEnquiry().subscribe(
    (data) => {
        if (data) {
            this.Services = data;

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
