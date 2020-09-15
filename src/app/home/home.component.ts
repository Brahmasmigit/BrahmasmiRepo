import { Component, OnInit } from '@angular/core';
import {HomeService} from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeService:HomeService) { }
  serviceTypes:[]=[];
  errorMessage:string;
  cityId:any;
  ngOnInit(): void {
    this.cityId=1;
    this.getServiceTypes(this.cityId);
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

}
