import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginservice : LoginService
  ) { }

  errorMessage:string;
  userDetails:any;
  registerModel:any={};
  ngOnInit(): void {
   // this.getLoginDetails("99999");

  }
  getLoginDetails(mobileNumber)
  {
    this.loginservice.getLoginDetails(mobileNumber).subscribe(
      (data) => {
          if (data) {
              this.userDetails = data;
          }

      },
      (error) => {
          this.errorMessage = error;     
      },
      () => {
       
      }

  );
  }
  Register()
  {
    this.loginservice.RegisterUser(this.registerModel).subscribe(
      (data) => {
          if (data) {
          }

      },
      (error) => {
          this.errorMessage = error;     
      },
      () => {
       
      }
    );
  }

}
