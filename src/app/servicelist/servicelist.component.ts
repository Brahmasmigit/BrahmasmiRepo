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
  errorMessage:any;
  constructor(private activatedRoute: ActivatedRoute,private serviceListService:ServiceListService) { }

  ngOnInit(): void {
   var servicetypeId= this.activatedRoute.snapshot.params['servicetypeId'];
   var cityId= this.activatedRoute.snapshot.params['cityId'];
   this.getServices(servicetypeId, cityId)
  }
  getServices(servicetypeId, cityId)
  {
    this.serviceListService.getServices(servicetypeId,cityId).subscribe(
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
}
