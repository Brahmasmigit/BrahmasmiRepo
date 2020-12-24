import { Component, OnInit, ViewChild } from '@angular/core';
import {adminOnBoardingService} from '../adminonboarding/adminonboarding.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm } from "@angular/forms";
import { UtilitiesService } from '../shared/services/utilities.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

import { ToastService } from '../shared/services/toastservice';
@Component({
  selector: 'app-adminonboarding',
  templateUrl: './adminonboarding.component.html',
  styleUrls: ['./adminonboarding.component.css']
})
export class AdminonboardingComponent implements OnInit {
  OnBoard:any;
  errorMessage:any;
  btnText:string;
  OnBoardingDetails:any;
  @ViewChild('adminonboarding') myForm: NgForm;
  constructor(private adminOnBoardingService : adminOnBoardingService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,private utilitiesService:UtilitiesService) { }

  ngOnInit(): void {
   
    this.getVedapatashalaOnBoarding();
  }
  getVedapatashalaOnBoarding()
  {
  
    this.adminOnBoardingService.getVedapatashalaOnBoarding().subscribe(
      (data) => {
          if (data) {
              this. OnBoardingDetails = data;
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
