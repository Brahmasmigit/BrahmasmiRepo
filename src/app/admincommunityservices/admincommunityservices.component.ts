import { Component, OnInit,ViewChild } from '@angular/core';
import {UtilitiesService} from '../shared/services/utilities.service';
import {ToastService} from '../shared/services/toastservice';
import { admincommunityservicesService} from './admincommunityservices.service';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {UserBillingService} from '../userbilling/userbilling.service';

@Component({
  selector: 'app-admincommunityservices',
  templateUrl: './admincommunityservices.component.html',
  styleUrls: ['./admincommunityservices.component.css']
})
export class admincommunityservicesComponent implements OnInit {
  State:any;
  City:any;
 errorMessage:any;
 Services:any;
 CommunityCategory:any;

 @ViewChild('CommunityForm')myForm:NgForm;
  constructor(private utilitiesService:UtilitiesService, private toastService:ToastService,
              private router:Router,
              private admincommunityServicesService:admincommunityservicesService) { }

  ngOnInit(): void {
    this.getAllCommunityCategories();

  }
  getAllCommunityCategories()
  {
    this.admincommunityServicesService.getAllCommunityCategories().subscribe(
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