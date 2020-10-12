import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import {UtilitiesService} from '../shared/services/utilities.service';
import {ToastService} from '../shared/services/toastservice'
import {UserProfileService} from './userprofile.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  errorMessage:string;
  userDetails:any;
  State:any=[];
  City:any=[];
  loginModel:any={};
  countryID:any;
  usermobileNumber:any;
  user_MobileNumber:any;
  userInfo:any={};
  userId:any;
  constructor( private userprofileservice :UserProfileService,private utilitiesService :UtilitiesService,private toastService: ToastService,
    private route: Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("userInfo")!=null)
    {
     this.userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
     this.userId=this.userInfo.userId;
    }
    this.countryID=1;
    this.loginModel.countryID=Number(this.countryID);
    this.getState();
  }
  selectState(id: number) {
    this.getCity(id);
  }
  selectCity(id:number)
  {

  }
getState()
{
  this.utilitiesService.getStates().subscribe(
    (data) => {
        if (data) {
            this.State = data;

        }

    },
    (error) => {
        this.errorMessage = error;
    },
    () => {
    }
);
}
  getCity(StateID)
  {

    this.utilitiesService.getCities(StateID).subscribe(
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
EditProfile()
{
 this.loginModel.stateID=Number(this.loginModel.stateID);
 this.loginModel.cityID=Number(this.loginModel.cityID);
 this.loginModel.UserID=Number(this.userId);
 console.log(this.loginModel)
  this.userprofileservice.EditUserProfile(this.loginModel).subscribe(
    (data) => {
        if (data) {
          this.showError("Your Profile Updated Successfully..")
        }
    },
    (error) => {
        this.errorMessage = error;
    },
    () => {

    }
  );
}
showError(msg) {
  this.toastService.show(msg, {
    classname: 'bg-info text-light',
    delay: 3000 ,
    autohide: true,
    headertext: 'Profile!'
  });
}

}
