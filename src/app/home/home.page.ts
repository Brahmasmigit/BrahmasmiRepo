import { Component } from '@angular/core';
import {HomeService} from '../home/home.service';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  servicetypes:any=[];
  errorMessage:string;
  cityId:any;

  slideOpts = {  
    initialSlide: 0,  
    speed: 3000,  
    effect: 'flip',  
  };  
  constructor(private homeService: HomeService,private router: Router) {}


  ngOnInit() {
  
 
  }
Navigate()
{
  this.router.navigate(['/servicetype']); 
}
go()
{
  this.router.navigate(['/contact']); 
}
BookPandit()
{
  this.router.navigate(['/vendorsearchmap']); 
}
VendorMap()
{
  this.router.navigate(['/vendordashboard']); 
}

}
