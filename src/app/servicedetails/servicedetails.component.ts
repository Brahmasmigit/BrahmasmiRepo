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

  constructor(private activatedRoute: ActivatedRoute,private serviceDetailsService:ServiceDetailsService) { }

  ngOnInit(): void {
    var serviceId= this.activatedRoute.snapshot.params['serviceId'];
    this.getServiceDetails(serviceId);
  }
  getServiceDetails(serviceId)
  {
    this.serviceDetailsService.getServiceDetails(serviceId).subscribe(
      (data) => {
          if (data) {
              this.serviceDetails = data;
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
