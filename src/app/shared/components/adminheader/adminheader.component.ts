import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent implements OnInit {
  myIndex:any = 0;
  isLogin:boolean=false;
  isAdmin:boolean=false;
  userInfo:any={};
  constructor( private router:Router) { }

  ngOnInit(): void {

    if(sessionStorage.getItem("userInfo")!=null)
    {
        this.isLogin=true;
        this.userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
        this.isAdmin=this.userInfo.userTypeId=="3" ? true : false;

    }
   else
   {
     this.isLogin=false;
   }
  }
  Logout()
  {
    this.isLogin=false;
    this.isAdmin=false;
    this.router.navigate(['/adminlogin']);
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
