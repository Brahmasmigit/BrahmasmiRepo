import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-storeheader',
  templateUrl: './storeheader.component.html',
  styleUrls: ['./storeheader.component.css']
})
export class StoreheaderComponent implements OnInit {
  isLogin:boolean=false;
  isStore:boolean=false;
  userInfo:any={};

  constructor() { }

  ngOnInit(): void {
    if(sessionStorage.getItem("userInfo")!=null)
    {
      this.isLogin=true;
     this.userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
    this.isStore=this.userInfo.userTypeId=="4" ? true : false;

    }
    else
    {
      this.isLogin=false;
    }
  }
  Logout()
  {
    this.isLogin=false;
    this.isStore=false;
    sessionStorage.clear();
  }

}
