import { Component, OnInit } from '@angular/core';
import {HomeService} from './home.service';
import {UtilitiesService} from '../shared/services/utilities.service';
import {ToastService} from '../shared/services/toastservice'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeService:HomeService, private utilitiesService :UtilitiesService,private toastService: ToastService) { }
  serviceTypes:[]=[];
  errorMessage:string;
  cityId:any;
  userInfo:any={};
  isLogin:boolean=false;
  isVendor:boolean=false;
  City:any=[];
  services:any=[];
  flag:any=true;
  serviceName:any;
  serviceId:any;
  ngOnInit(): void {
    if(sessionStorage.getItem("userInfo")!=null)
    {
      this.isLogin=true;
     this.userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
    this.isVendor=this.userInfo.userTypeId=="2" ? true : false;

    }
    else
    {
      this.isLogin=false;
    }
    this.cityId=1;
    this.getCity();
    this.getServiceTypes(this.cityId);
  }
  getCity()
  {

    this.utilitiesService.getCities(0).subscribe(
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
  getServiceTypes(cityid)
  {
    this.homeService.getServiceTypes(cityid).subscribe(
      (data) => {
          if (data) {
              this.serviceTypes = data;
          }

      },
      (error) => {
          this.errorMessage = error;
      },
      () => {

      });
  }
  selectCity(event:any)
  {
    this.cityId=event.target.value;
    this.getServiceTypes(this.cityId);
  }
  Search(search)
  {
    this.homeService.SearchService(search,this.cityId).subscribe(
      (data) => {
          if (data) {
              this.services = data;
          }

      },
      (error) => {
          this.errorMessage = error;
      },
      () => {

      });
  }
  searchService(serviceName): void {
    this.flag = true;
    this.Search(serviceName);
  }
  onselectItem(item)
  {
    if (item.serviceId != 0) {
      this.serviceName = item.serviceName;
      this.serviceId=item.serviceId;
      this.flag = false;
    }
    else {
      return false;
    }
  }
  OnSearchClick()
  {
    if(this.serviceName!=undefined && this.serviceName!="" && this.serviceId!=0)
    {

    }
  }
  Logout()
  {
    this.isLogin=false;
    this.isVendor=false;
    sessionStorage.clear();
  }

}
