import { Component, OnInit, ViewChild } from '@angular/core';
import { OnBoardingService } from '../onboarding/onboarding.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm } from "@angular/forms";
import { UtilitiesService } from '../shared/services/utilities.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

import { ToastService } from '../shared/services/toastservice';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit {
  errorMessage: any;
  onboard: any = {};
  onBoardingModel: any = {};
  onBoardingDetails: any;
  SpecializationArray: Array<DynamicGrid1> = [];
  newSpecialization: any = {};
  State: any;
  City: any;
  btnText: string;
  Certification: any = [];
  selectedCertification = [];
  @ViewChild('vedapatashalaOnBoardingForm') myForm: NgForm;
  constructor(
    private onboardingService: OnBoardingService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private utilitiesService: UtilitiesService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {

    this.getState();
    this.getCertification();
    this.btnText = "Register";
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  change(e, type) {
    console.log(type);
    if (type.isChecked == true) {
      this.selectedCertification.push(type);

    }
  }
  vedapatashalaOnBoarding() {


    this.onboard.cityID = Number(this.onboard.cityID);
    this.onboard.stateID = Number(this.onboard.stateID);
    console.log(this.selectedCertification)
    this.onboard.VedapatashalaCertification = this.selectedCertification;
    console.log(this.onboard);
    this.onboardingService.vedapatashala(this.onboard).subscribe(
      (data) => {
        if (data) {
          if (data == "1") {
            console.log(data)
         
            this.showError('Successfully Registered ...')
            this.myForm.resetForm();
            this.onboard = {};
          }
          else {
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
  getAllCity(id) {

    this.utilitiesService.getCities(id).subscribe(
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

  showError(msg) {
    this.toastService.show(msg, {
      classname: 'bg-info text-light',
      delay: 4000,
      autohide: true,
      headertext: 'OnBoarding Details!'
    });
  }
  getCertification() {

    this.utilitiesService.getCertification().subscribe(
      (data) => {
        if (data) {
          this.Certification = data;
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
  selectState(id: number) {
    this.getAllCity(id);
  }
  getState() {
    this.utilitiesService.getStates().subscribe(
      (data) => {
        if (data) {
          this.State = data;
          console.log("StateData", data)
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
export class DynamicGrid1 {
  Specialization: string;

}
