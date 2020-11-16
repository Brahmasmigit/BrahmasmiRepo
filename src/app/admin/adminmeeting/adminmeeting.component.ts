import { Component, OnInit } from '@angular/core';
import {AdminMeetingService} from '../adminmeeting/adminmeeting.service';
import {ToastService} from '../../shared/services/toastservice';

@Component({
  selector: 'app-adminmeeting',
  templateUrl: './adminmeeting.component.html',
  styleUrls: ['./adminmeeting.component.css']
})
export class AdminmeetingComponent implements OnInit {
  loginModel:any={};
  errorMessage:any;
  constructor(private adminMeetingService:AdminMeetingService,
    private toastService:ToastService
    ) { }

  ngOnInit(): void {
  }

  CreateMeeting()
  {
    if(this.loginModel.MeetingId==undefined || this.loginModel.MeetingId=="")
    {
      this.showError("Please Enter Meeting Id");
      return;
    }
    if(this.loginModel.MeetingPassword==undefined || this.loginModel.MeetingPassword=="")
    {
      this.showError("Please Enter Meeting Password");
      return;
    }

this.loginModel.Signature="";
    this.adminMeetingService.ScheduleMeeting(this.loginModel).subscribe(
      (data) => {
          if (data) {
              if(data=="1")
              {
                this.showError("Meeting Scheduled Successfully.");
              }
              else
              {
                this.errorMessage ="Record not updated, please try after some time."
              }
          }

      },
      (error) => {
          this.errorMessage = error;
      },
      () => {

      });
  }
  showError(msg) {
    this.toastService.show(msg, {
      classname: 'bg-info text-light',
      delay: 3000 ,
      autohide: true,
      headertext: 'Meeting!'
    });
  }
}
