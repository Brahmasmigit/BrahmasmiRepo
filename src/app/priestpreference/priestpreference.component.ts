import { Component, OnInit } from '@angular/core';
import {UtilitiesService} from '../shared/services/utilities.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-priestpreference',
  templateUrl: './priestpreference.component.html',
  styleUrls: ['./priestpreference.component.css']
})
export class PriestpreferenceComponent implements OnInit {
  cityId:any;City:any;errorMessage:any;Languages:any;serviceId:any;priestModel:any={};
  constructor(private utilitiesService :UtilitiesService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.serviceId= this.activatedRoute.snapshot.params['serviceId'];
    this.priestModel.serviceId=this.serviceId;
    this.getCity();
    this. getLanguages();
  }
  selectCity(event:any)
  {
    this.cityId=event.target.value;
 
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
  getLanguages()
{
  this.utilitiesService.getlanguages().subscribe(
    (data) => {
        if (data) {
            this.Languages = data;
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
  continue()
  {

  }
}
