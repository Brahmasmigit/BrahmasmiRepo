import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
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
  userid:any;
  userInfo:any={}
  constructor(private activatedRoute: ActivatedRoute,
    private userDashboardService:UserDashboardService,
    private router:Router,
    private eventListenerService:EventListenerService)
    {
      /*this.serviceSubscription = this.eventListenerService.on("Accept", ((res) => {
        console.log(res);
        this.test=res;
    }));*/
    }

  ngOnInit(): void {

    if(sessionStorage.getItem("userInfo")!=null)
    {
      this.userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
      this.userid=this.userInfo.userId;
      this.getOngoing(this.userid);
    }
    else
    {
      this.router.navigate(['/login']);
    }

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
