import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  isLogin:boolean=false;
  isVendor:boolean=false;
  userInfo:any={};

    constructor( private router:Router) {

     }

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
    this.router.navigate(['/login']);
  }
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";

  }

   closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";

  }



}

