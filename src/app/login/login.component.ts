import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import { ActivatedRoute, Router } from '@angular/router';
import {ToastService} from '../shared/services/toastservice'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginservice : LoginService,
    private toastService: ToastService,private route: Router
  ) { }

  errorMessage:string;
  isLogin:boolean=false;
  loginModel:any={};
  ActualOTP:any;
  isOtp:boolean=false;
  userInfo:any={};
  userModel:any={};
  ngOnInit(): void {
    this.loginModel.mobileNumber="";
  }
  SendOTP()
  {
    if(this.loginModel.mobileNumber=="")
    {
      this.showError("Please enter mobile Number");
      return false;
    }
    this.loginservice.sendOTPToUser(this.loginModel).subscribe(
      (data) => {
          if (data) {
            this.ActualOTP=data;
            this.isLogin=true;
          }
      },
      (error) => {
          this.errorMessage = error;
      },
      () => {

      }
    );

  }

  onOtpChange(value)
  {
    if(value.length==4)
    {
      if(value==this.ActualOTP)
      {
        this.isOtp=true;
      }

    }

  }
 Login()
 {
   if(this.isOtp)
   {
  this.loginservice.getVendorData(this.loginModel.mobileNumber).subscribe(
    (data) => {
        if (data) {
          this.userInfo.userId=data.vendorID;
          this.userInfo.userTypeId=data.userTypeID;
          sessionStorage.setItem("userInfo",JSON.stringify(this.userInfo));
          this.route.navigate(['./vendordashboard']);

        }
        else{
          this.loginservice.getUser(this.loginModel.mobileNumber).subscribe(
            (data) => {
                if (data) {
                  this.userInfo.userId=data.userID;
                  this.userInfo.userTypeId=data.userTypeID;
                  sessionStorage.setItem("userInfo",JSON.stringify(this.userInfo));
                  this.route.navigate(['./userdashboard']);
                }
                else{
                    this.userModel.User_MobileNumber=this.loginModel.mobileNumber;
                      this.loginservice.SaveUserData(this.userModel).subscribe(
                        (data) => {
                            if (data) {
                              this.userInfo.userId=data.userID;
                              this.userInfo.userTypeId=data.userTypeID;
                              sessionStorage.setItem("userInfo",JSON.stringify(this.userInfo));
                                this.route.navigate(['./userdashboard']);
                            }
                            else{

                            }

                        },
                        (error) => {
                            this.errorMessage = error;
                        },
                        () => {
                        }
                      );
                }
            },
            (error) => {
                this.errorMessage = error;
            },
            () => {
            }
        );

        }
    },
    (error) => {
        this.errorMessage = error;
    },
    () => {
    }
);
  }
  else
  {
    this.showError("OTP is not valid");
  }
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
