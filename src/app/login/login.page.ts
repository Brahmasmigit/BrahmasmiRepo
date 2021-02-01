import { Component, OnInit } from '@angular/core';
import { ToastController,AlertController  } from '@ionic/angular'; 
import { LoadingController,NavController } from '@ionic/angular';  
import { ActivatedRoute,Router } from '@angular/router';
import {LoginService} from '../login/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private loginservice : LoginService,
    public toastCtrl: ToastController,
   private route: Router
  ) { }

  errorMessage:string;
  isLogin:boolean=false;
  loginModel:any={};
  ActualOTP:any;
  isOtp:boolean=false;
  userInfo:any={};
  userModel:any={};
  userRegModel:any={};
  isotpPanel:boolean=true;
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
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
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
    this.userModel.User_MobileNumber=this.loginModel.mobileNumber;
    this.userModel.User_Password="";
  this.loginservice.getVendorData(this.userModel)
  .subscribe(
    (data) => {
        if (data) {
          this.userInfo.userId=data.vendorID;
          this.userInfo.userTypeId=data.userTypeID;
          this.userInfo.name=data.name;
          console.log(this.userInfo)
          sessionStorage.clear();
          sessionStorage.setItem("userInfo",JSON.stringify(this.userInfo));
          this.route.navigate(['./vendordashboard']);

        }
        else{

          this.loginservice.getUser(this.userModel).subscribe(
            (data) => {
                if (data) {
                  this.userInfo.userId=data.userID;
                  this.userInfo.userTypeId=data.userTypeID;
                  this.userInfo.name=data.name;
                  console.log(data)
                  console.log(this.userInfo)
                  sessionStorage.clear();
                  sessionStorage.setItem("userInfo",JSON.stringify(this.userInfo));
                  this.route.navigate(['./userdashboard']);
                }
                else{
                  this.loginservice.getStoreData(this.userModel).subscribe(
                    (data) => {
                        if (data) {
                          this.userInfo.userId=data.storeID;
                          this.userInfo.userTypeId=data.userTypeID;
                          this.userInfo.name=data.name;
                          console.log(this.userInfo)
                          sessionStorage.setItem("userInfo",JSON.stringify(this.userInfo));
                          this.route.navigate(['./storedashboard']);
                          }
                          else
                          {

                            this.userRegModel.User_MobileNumber=this.loginModel.mobileNumber;

                            console.log(this.userRegModel)
                            this.loginservice.SaveUserData(this.userRegModel).subscribe(
                              (data) => {
                                  if (data) {
                                    this.userInfo.userId=data.userID;
                                    this.userInfo.userTypeId=data.userTypeID;
                                    this.userInfo.name=data.name;
                                    console.log(this.userInfo)
                                    console.log(data)
                                    sessionStorage.clear();
                                    sessionStorage.setItem("userInfo",JSON.stringify(this.userInfo));
                                   this.route.navigate(['./userdashboard']);
                                  }
                                  else{

                                  }

                              }
                            );
                          }

                        }


                    );

                }//end of else
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
 LoginWithPassword()
 {
  this.userModel.User_MobileNumber=this.loginModel.mobileNumber;
  this.userModel.User_Password=this.loginModel.password;

  this.loginservice.getVendorData(this.userModel).subscribe(
    (data) => {
        if (data) {
          this.userInfo.userId=data.vendorID;
          this.userInfo.userTypeId=data.userTypeID;
          this.userInfo.name=data.name;
          sessionStorage.clear();
          sessionStorage.setItem("userInfo",JSON.stringify(this.userInfo));
          this.route.navigate(['/vendordashboard']);

        }
        else{
          this.loginservice.getUser(this.userModel).subscribe(
            (data) => {
                if (data) {
                  this.userInfo.userId=data.userID;
                  this.userInfo.userTypeId=data.userTypeID;
                  this.userInfo.name=data.name;
                  sessionStorage.clear();
                  sessionStorage.setItem("userInfo",JSON.stringify(this.userInfo));
                  this.route.navigate(['/userdashboard']);
                }
                else{
                  this.loginservice.getStoreData(this.userModel).subscribe(
                    (data) => {
                        if (data) {
                          this.userInfo.userId=data.storeID;
                          this.userInfo.userTypeId=data.userTypeID;
                          this.userInfo.name=data.name;
                          sessionStorage.clear();
                          sessionStorage.setItem("userInfo",JSON.stringify(this.userInfo));
                          this.route.navigate(['./storedashboard']);
                          }
                          else
                          {
                            this.showError("Invalid Credentials");
                          }


                      }
                    );
                  }
                });

        }//end of else
    },
    (error) => {
        this.errorMessage = error;
    },
    () => {
    }
);

}
async showError(msg) {  
  const toast = await this.toastCtrl.create({  
    message: msg,   
    position: 'middle',  
    duration: 2000,
    color:'danger'
  });  
  toast.present();  
  toast.onDidDismiss().then((val) => {  
    console.log('Toast Dismissed');  
  });  
}
ShowPanel(otp)
{
this.isotpPanel = otp=="otp" ? true: false;
} 

}
