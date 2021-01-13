import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ServiceDetailsService}  from './servicedetails.service';

@Component({
  selector: 'app-servicedetails',
  templateUrl: './servicedetails.component.html',
  styleUrls: ['./servicedetails.component.css']
})

export class ServicedetailsComponent implements OnInit {
  serviceDetails:any={}
  errorMessage:any;
  haveImg:boolean=false;
  noImg:boolean=false;
  paramsModel:any={};
  cartitems:any=[];
  vendorId:any;
  public isCollapsed = true;
  public isCollapsed2= true;
  public isCollapsed3= true;
  public isCollapsed4= true;
  constructor(private activatedRoute: ActivatedRoute,private serviceDetailsService:ServiceDetailsService) { }

  ngOnInit(): void {
    var serviceId= this.activatedRoute.snapshot.params['serviceId'];
    var languageName= this.activatedRoute.snapshot.params['languageName'];
    var CityId= this.activatedRoute.snapshot.params['cityId'];
    
    this.paramsModel.languageName=languageName;
    console.log(this.serviceDetails.languageName)
    this.paramsModel.cityId=CityId;
    console.log(this.serviceDetails.cityId)
    this.getServiceDetails(serviceId);
    if (sessionStorage.getItem("orderdetailsByMap") != null) {
      this.cartitems = JSON.parse(sessionStorage.getItem("orderdetailsByMap"));
      console.log(this.cartitems)
      this.vendorId=this.cartitems[0].VendorList[0].vendorId;

      }
        }
  getServiceDetails(serviceId)
  {
    this.serviceDetailsService.getServiceDetails(serviceId).subscribe(
      (data) => {
          if (data) {
              this.serviceDetails = data;
            //  console.log(data.serviceImage)
              if(this.serviceDetails.serviceImage==null)
              {
                this.noImg=true;
              }
              else{
                this.haveImg=true;
              }
             
              console.log(data)
          }

      },
      (error) => {
          this.errorMessage = error;     
      },
      () => {
       
      });
  }
}
