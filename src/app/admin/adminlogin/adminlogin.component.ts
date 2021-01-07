import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AdminLoginService} from './adminlogin.service';
import {ToastService} from '../../shared/services/toastservice';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  errorMessage:string;
  isLogin:boolean=false;
  loginModel:any={};
  userInfo:any={};
  constructor(private toastService: ToastService,private route: Router,
    private adminLoginService:AdminLoginService) { }

  ngOnInit(): void {
    this.loginModel.userName=="";
    this.loginModel.password=="";
  }
  checkAdminExist()
  {
    if(this.loginModel.userName=="")
    {
      this.showError("Please enter UserName");
      return false;
    }
    if(this.loginModel.password=="")
    {
      this.showError("Please enter Password");
      return false;
    }
    console.log(this.loginModel)
    this.adminLoginService.AuthenticateAdmin(this.loginModel).subscribe(
      (data) => {
          if (data) {
           this.isLogin=true;
           this.loginModel={};
           let userdata:any;
           userdata=[];
           userdata=data;
           this.userInfo.userId=userdata.userId;
        
           this.userInfo.userTypeId=userdata.userType;
           console.log(this.userInfo.userTypeId)
           this.userInfo.name=userdata.userName;
           sessionStorage.clear();
           sessionStorage.setItem("userInfo",JSON.stringify(this.userInfo));
           this.route.navigate(['./admindashboard']);
          }
          else
          {
            this.loginModel={};
            this.showError('Please enter valid Username/ Password.')
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
      delay: 4000 ,
      autohide: true,
      headertext: 'Login!'
    });
  }
}
