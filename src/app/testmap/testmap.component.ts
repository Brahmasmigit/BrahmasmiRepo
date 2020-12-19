import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-testmap',
  templateUrl: './testmap.component.html',
  styleUrls: ['./testmap.component.css']
})
export class TestmapComponent implements OnInit {
  myIndex:any = 0;
  isLogin:boolean=false;
  isVendor:boolean=false;
  userInfo:any={};

  constructor(    private router:Router) { }

  ngOnInit(): void {
    this.myIndex=0;
    this.carousel();

    var dropdown = document.getElementsByClassName("dropdown-btn");
    var i;

    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var dropdownContent = this.nextElementSibling;
      if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
      } else {
      dropdownContent.style.display = "block";
      }
      });
    }

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

   carousel() {

    var i:any;
    var x:any = document.getElementsByClassName("mySlides");
   for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }

    this.myIndex++;
    if (this.myIndex > x.length) {
      this.myIndex = 1
    }
    x[this.myIndex-1].style.display = "block";
    //setTimeout(this.carousel, 10000); // Change image every 2 seconds
    setTimeout(()=>{                           //<<<---using ()=> syntax
    this.carousel();
 }, 10000);
  }


}
