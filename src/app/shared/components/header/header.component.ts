import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  isLogin:boolean=false;
  isVendor:boolean=false;
  userInfo:any={};
  ngOnInit(): void {
    if(sessionStorage.getItem("userInfo")!=null)
    {
      this.isLogin=true;
     this.userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
    this.isVendor=this.userInfo.userTypeId=="2" ? true : false;

    }
    else
    {
      this.isLogin=false;
    }
  }
  Logout()
  {
    this.isLogin=false;
    this.isVendor=false;
    sessionStorage.clear();
  }


}
