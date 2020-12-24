import { Component, OnInit,ViewChild } from '@angular/core';
import {UtilitiesService} from '../shared/services/utilities.service';
import {ToastService} from '../shared/services/toastservice';
import { CommunityServicesService} from './CommunityServices.service';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {UserBillingService} from '../userbilling/userbilling.service';

@Component({
  selector: 'app-communityservices',
  templateUrl: './CommunityServices.component.html',
  styleUrls: ['./CommunityServices.component.css']
})
export class CommunityServicesComponent implements OnInit {
  State:any;
  City:any;
 errorMessage:any;
 CommunityModel:any={};
 CommunityCategories:any;

 @ViewChild('CommunityForm')myForm:NgForm;
  constructor(private utilitiesService:UtilitiesService, private toastService:ToastService,
              private router:Router,
              private communityServicesService:CommunityServicesService) { }

  ngOnInit(): void {
    this.getState();
    this.getCommunityCategories();

  }
  selectState(id:number) {
    console.log(id)
    this.getCity(id);

  }
 
  getState()
  {
    this.utilitiesService.getStates().subscribe(
      (data) => {
          if (data) {
              this.State = data;
          }
      },
      (error) => {
          this.errorMessage = error;
      },
      () => {
      }
  );
  }
    getCity(StateID)
    {
  
      this.utilitiesService.getCities(StateID).subscribe(
        (data) => {
            if (data) {
                this.City = data;
  
            }
  
        },
        (error) => {
            this.errorMessage = error;
        },
        () => {
        }
    );
  }

  getCommunityCategories()
  {
    this.communityServicesService.getCommunityCategories().subscribe(
      (data) => {
          if (data) {
              this.CommunityCategories = data;
          }
      },
      (error) => {
          this.errorMessage = error;
      },
      () => {
      }
  );
  }
  RegisterCommunityServices()
  {
    this.CommunityModel.stateID=Number(this.CommunityModel.stateID);
    this.CommunityModel.cityID=Number(this.CommunityModel.cityID);
    this.CommunityModel.communityCategoryID=Number(this.CommunityModel.communityCategoryID);
 console.log(this.CommunityModel)
  this.communityServicesService.saveCommunity(this.CommunityModel).subscribe(
    (data) => {
        if (data) {
          this.showError("Registration has been Successfully..")
          this.myForm.resetForm();
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
      headertext: 'CommunityServices details!'
    });
  }
}
