import { Component, OnInit,ViewChild } from '@angular/core';
import {adminconcernenquiryService} from '../adminconcernenquiry/adminconcernenquiry.service';
import {Router,ActivatedRoute } from '@angular/router';
import {ToastService} from '../shared/services/toastservice';
import {UtilitiesService} from '../shared/services/utilities.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-adminconcernenquiry',
  templateUrl: './adminconcernenquiry.component.html',
  styleUrls: ['./adminconcernenquiry.component.css']
})
export class adminconcernenquiryComponent implements OnInit {
  btnText:string;
  Services:any;
  errorMessage:any;
  @ViewChild('adminconcernenquiry') myForm: NgForm;
  constructor(
    private adminconcernenquiryService : adminconcernenquiryService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,private utilitiesService:UtilitiesService
  ) { }
  ngOnInit(): void {
    this.btnText="Submit";
    this.getAllConcernDetails();
  }
  getAllConcernDetails()
{
  this.adminconcernenquiryService.getAllConcernDetails().subscribe(
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
