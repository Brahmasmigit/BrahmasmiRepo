import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {UserDashboardService} from './userdashboard.service';
import {EventModel} from '../shared/models/eventmodel';
import {EventListenerService} from '../shared/services/eventlistener.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
  ongoing:[]=[];
  errorMessage:any;
  serviceSubscription:any;
  test:any;
  constructor(private activatedRoute: ActivatedRoute,
    private userDashboardService:UserDashboardService,
    private eventListenerService:EventListenerService) 
    {
      /*this.serviceSubscription = this.eventListenerService.on("Accept", ((res) => {
        console.log(res);
        this.test=res;
    }));*/
    }

  ngOnInit(): void {
   
    var userid=1;
    this.getOngoing(userid);
  }
  getOngoing(userid)
  {
    this.userDashboardService.getOngoing(userid).subscribe(
      (data) => {
          if (data) {
              this.ongoing = data;
          }

      },
      (error) => {
          this.errorMessage = error;     
      },
      () => {
       
      });
  }
  ngOnDestroy() {
  }
  

}
