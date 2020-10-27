import { Component, OnInit } from '@angular/core';
import {VendorCityService} from './vendorcity.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-vendorcity',
  templateUrl: './vendorcity.component.html',
  styleUrls: ['./vendorcity.component.css']
})
export class VendorcityComponent implements OnInit {
  errorMessage:string;
  APCities:any;TSCities:any;
  CityModel:any={};
  stateID:any;
  constructor( private vendorCityService : VendorCityService,private route: Router) { }

  ngOnInit(): void {
    this.getCity(this.stateID);
  }
  selectedIndex: any;
  selectAP(index: any) {
    sessionStorage.setItem("StateID","1")
    sessionStorage.setItem("CityName","Andhra Pradesh")
    sessionStorage.setItem("CityID",index.cityID)
    sessionStorage.setItem("CityName",index.cityName)
    this.route.navigate(['./vendorenquiry']);
  }
  selectTS(index: any) {

    sessionStorage.setItem("StateID","2")
    sessionStorage.setItem("CityName","Telangana")
    sessionStorage.setItem("CityID",index.cityID)
    sessionStorage.setItem("CityName",index.cityName)
    this.route.navigate(['./vendorenquiry']);
  }
  getCity(StateID)
  {
    StateID=1;
    this.vendorCityService.getCities(StateID).subscribe(
      (data) => {
          if (data) {
              this.APCities = data;
          }

      },
      (error) => {
          this.errorMessage = error;
      },
      () => {

      }

  );
  StateID=2;
  this.vendorCityService.getCities(StateID).subscribe(
    (data) => {
        if (data) {
            this.TSCities = data;
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
