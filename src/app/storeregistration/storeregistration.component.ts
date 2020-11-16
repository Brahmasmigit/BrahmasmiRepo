import { Component, OnInit,ViewChild } from '@angular/core';
import {StoreRegistrationService} from '../storeregistration/storeregistration.service';
import {Router,ActivatedRoute } from '@angular/router';
import {ToastService} from '../shared/services/toastservice';
import {UtilitiesService} from '../shared/services/utilities.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-storeregistration',
  templateUrl: './storeregistration.component.html',
  styleUrls: ['./storeregistration.component.css']
})
export class StoreregistrationComponent implements OnInit {
  btnText:string;
  store:any={};
  City:any;
  errorMessage:any;
  @ViewChild('registerStoreForm') myForm: NgForm;
  constructor(
    private storeRegistrationService : StoreRegistrationService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,private utilitiesService:UtilitiesService
  ) { }

  ngOnInit(): void {
    this.btnText="Register";
    this.getAllCity();
  }
  getAllCity()
  {

    this.utilitiesService.getAllCities().subscribe(
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
  registerStore()
  {

 this.store.cityID=Number(this.store.cityID);
 console.log(this.store);
    this.storeRegistrationService.StoreRegistration(this.store).subscribe(
      (data) => {
          if (data) {
              if(data=="1")
              {
                this.myForm.resetForm();
              this.showError('Successfully Registered ...')
              this.store={};
              }
              else
              {
                this.showError('Your details are not Saved, Please try after some time')
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
      headertext: 'Store details!'
    });
  }

}
