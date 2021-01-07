import { Component, OnInit,ViewChild } from '@angular/core';
import {adminpoojasubscriptionformService} from '../adminpoojasubscriptionform/adminpoojasubscriptionform.service';
import {Router,ActivatedRoute } from '@angular/router';
import {ToastService} from '../shared/services/toastservice';
import {UtilitiesService} from '../shared/services/utilities.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-adminpoojasubscriptionform',
  templateUrl: './adminpoojasubscriptionform.component.html',
  styleUrls: ['./adminpoojasubscriptionform.component.css']
})
export class adminpoojasubscriptionformComponent implements OnInit {
  btnText:string;
  Services:any;
  errorMessage:any;
  @ViewChild('adminpoojasubscriptionform') myForm: NgForm;
  constructor(
    private adminpoojasubscriptionformService : adminpoojasubscriptionformService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,private utilitiesService:UtilitiesService
  ) { }
  ngOnInit(): void {
    this.btnText="Submit";
    this.getAllSubscriptionForm();
  }
  getAllSubscriptionForm()
{
  this.adminpoojasubscriptionformService.getAllSubscriptionForm().subscribe(
    (data) => {
        if (data) {
            this.Services = data;
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
