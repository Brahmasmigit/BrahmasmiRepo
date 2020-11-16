import { Component, OnInit } from '@angular/core';
import { ZoomMtg } from '@zoomus/websdk';
import {ToastService} from '../shared/services/toastservice'
import {UtilitiesService} from '../shared/services/utilities.service';
import '@zoomus/websdk/dist/css/bootstrap.css';
import '@zoomus/websdk/dist/css/react-select.css';

ZoomMtg.setZoomJSLib('https://source.zoom.us/1.8.1/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();
//ZoomMtg.setZoomJSLib('http://localhost:4200/node_modules/@zoomus/websdk/dist/lib/', '/av')
//ZoomMtg.setZoomJSLib('node_modules/@zoomus/websdk/dist/lib', '/av');
//ZoomMtg.setZoomJSLib('https://source.zoom.us/1.8.1/lib', '/av');
@Component({
  selector: 'app-zoomuser',
  templateUrl: './zoomuser.component.html',
  styleUrls: ['./zoomuser.component.css']
})
export class ZoomuserComponent  {
  signatureEndpoint = '';

  apiKey = '';
  meetingNumber = '';
  role = 0;
  //leaveUrl = 'http://localhost:4200'
  leaveUrl = 'https://brahmasmisit.azurewebsites.net';
  userName = '';
  userEmail = '';
  passWord = '';
  loginModel:any={};
  errorMessage:any;
  bookingId:any;
  constructor(private toastService:ToastService,
    private utilitiesService:UtilitiesService
    ) {
    //this.startMeeting();
    document.getElementById('zmmtg-root').style.display = 'none'

   }

 /* ngOnInit(): void {
    this.startMeeting();
  }*/
  getSignature() {
   /* this.httpClient.post(this.signatureEndpoint, {
	    meetingNumber: this.meetingNumber,
	    role: this.role
    }).toPromise().then((data: any) => {
      if(data.signature) {
        console.log(data.signature)
        this.startMeeting(data.signature)
      } else {
        console.log(data)
      }
    }).catch((error) => {
      console.log(error)
    })*/

  }
  GetMeetingDetails()
  {
    if(this.loginModel.username==undefined || this.loginModel.username=="")
    {
      this.showError("Please Enter your Name");
      return;
    }
    if(sessionStorage.getItem("BookingId")!=null)
    {
      this.bookingId=sessionStorage.getItem("BookingId");
    }
    this.utilitiesService.GetMeetingDetails(this.bookingId).subscribe(
      (data) => {
          if (data) {
            this.meetingNumber=data.meetingId;
            this.passWord=data.meetingPassword;
            this.signatureEndpoint=data.signature;
            this.apiKey=data.apiKey;
            this.startMeeting();
          }

      },
      (error) => {
          this.errorMessage = error;
      },
      () => {

      });
  }
  startMeeting() {


    document.getElementById('zmmtg-root').style.display = 'block'
    this.userName=this.loginModel.username;
    ZoomMtg.init({
      leaveUrl: this.leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: this.signatureEndpoint,
          meetingNumber: this.meetingNumber,
          userName: this.userName,
          apiKey: this.apiKey,
          userEmail: this.userEmail,
          passWord: this.passWord,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  showError(msg) {
    this.toastService.show(msg, {
      classname: 'bg-info text-light',
      delay: 5000 ,
      autohide: true,
      headertext: 'Login!'
    });
  }

}
