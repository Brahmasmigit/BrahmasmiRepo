import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ServiceListService} from './servicelist.service';

@Component({
  selector: 'app-servicelist',
  templateUrl: './servicelist.component.html',
  styleUrls: ['./servicelist.component.css']
})

export class ServicelistComponent implements OnInit {

  services:[]=[];
  errorMessage:any;languageName:any;cityId:any;servicetypeId:any;
  constructor(private activatedRoute: ActivatedRoute,private serviceListService:ServiceListService) { }

  ngOnInit(): void {
   this.servicetypeId= this.activatedRoute.snapshot.params['servicetypeId'];
   this.cityId= this.activatedRoute.snapshot.params['cityId'];
  this.languageName= this.activatedRoute.snapshot.params['languageName'];
   this.getServices(this.servicetypeId, this.cityId)
  }
  getServices(servicetypeId, cityId)
  {
    this.serviceListService.getServices(servicetypeId,cityId).subscribe(
      (data) => {
          if (data) {
              this.services = data;
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
