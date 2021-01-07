import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute,Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import {HomeService} from '../home/home.service';
import {UtilitiesService} from '../shared/services/utilities.service';
import {ToastService} from '../shared/services/toastservice'


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  isLogin:boolean=false;
  isVendor:boolean=false;
  userInfo:any={};username:any;
  enrollment:boolean=false;
  showChat:boolean=false;
  showECart:boolean=false;
  showAstrology:boolean=false;
  showPandit:boolean=false;
  serviceTypes:[]=[];
  errorMessage:string;
  cityId:any;languageID:any;
  languageName:string;

  City:any=[];
  services:any=[];
  flag:any=true;
  serviceName:any;
  serviceId:any;
  Languages:any;
mostcommn=[
  {imgid:97,img: "../../assets/homepageimages/ganapathi01.png"},
  {imgid:32,img: "../../assets/homepageimages/shiva01.png"},
  {imgid:220, img: "../../assets/homepageimages/hanuman01.png"},
   {imgid:67,img: "../../assets/homepageimages/ayyappa001.png"},
  {imgid:100,img: "../../assets/homepageimages/saibaba01.png"},
  // {img: "../../assets/homepageimages/laxmi01.png"},
  // {img: "../../assets/homepageimages/venkateswara01.png"},
  {imgid:67,img: "../../assets/homepageimages/ayyappa001.png"},
  {imgid:100,img: "../../assets/homepageimages/saibaba01.png"},
  // {img: "../../assets/homepageimages/laxmi01.png"},
  // {img: "../../assets/homepageimages/venkateswara01.png"}
];
poojasbycategory = [ 
  {imgid:6,img: "../../assets/homepageimages/poojalu.png"},
{imgid:8,img: "../../assets/homepageimages/homalu001.png"},
{imgid:1,img: "../../assets/homepageimages/kalyanam.png"},
 {imgid:10,img: "../../assets/homepageimages/shanthi-homalu.png"},
{imgid:4,img: "../../assets/homepageimages/pashpatha-homalu.png"},
// {imgid:97,img: "../../assets/homepageimages/vrathalu01.png"},
{imgid:8,img: "../../assets/homepageimages/homalu001.png"},
{ imgid:1,img: "../../assets/homepageimages/kalyanam.png"},
 {imgid:10,img: "../../assets/homepageimages/shanthi-homalu.png"},
{imgid:4,img: "../../assets/homepageimages/pashpatha-homalu.png"},
// {img: "../../assets/homepageimages/vrathalu01.png"},
];
recentpoojas = [ 
  {imgid:9,img: "../../assets/homepageimages/varalaxmivratham.png"},
{imgid:54,img: "../../assets/homepageimages/satyanarayanavratham.png"},
{imgid:6,img: "../../assets/homepageimages/durgapooja.png"},
{imgid:9,img: "../../assets/homepageimages/varalaxmivratham.png"},
{imgid:54,img: "../../assets/homepageimages/satyanarayanavratham.png"},
{imgid:6,img: "../../assets/homepageimages/durgapooja.png"},
{imgid:9,img: "../../assets/homepageimages/varalaxmivratham.png"},
{imgid:54,img: "../../assets/homepageimages/satyanarayanavratham.png"},
{imgid:6,img: "../../assets/homepageimages/durgapooja.png"},

];
toppriest=
[ 
  {img: "../../assets/homepageimages/Priest_Img.png"}


];
upcomingevents=[
  {img: "../../assets/homepageimages/bhogi.png"},
{img: "../../assets/homepageimages/ugadi.png"},
{img: "../../assets/homepageimages/sankranthi.png"},
{img: "../../assets/homepageimages/bhogi.png"},
{img: "../../assets/homepageimages/ugadi.png"},
{img: "../../assets/homepageimages/sankranthi.png"},
{img: "../../assets/homepageimages/bhogi.png"},
{img: "../../assets/homepageimages/ugadi.png"},
{img: "../../assets/homepageimages/sankranthi.png"},
]
auspiciousdates=[
  {img: "../../assets/homepageimages/dec-11th.png"},
  {img: "../../assets/homepageimages/dec-15th.png"},
  {img: "../../assets/homepageimages/dec-19th.png"},
   {img: "../../assets/homepageimages/dec-20th.png"},
  {img: "../../assets/homepageimages/dec-25th.png"},
  {img: "../../assets/homepageimages/dec-27th.png"},
  {img: "../../assets/homepageimages/dec-29th.png"},
  {img: "../../assets/homepageimages/dec-30th.png"}
]

horoscope=[
  {img: "../../assets/homepageimages/aries-horoscope.png"},
  {img: "../../assets/homepageimages/taurus-horoscope.png"},
  {img: "../../assets/homepageimages/gemini-horoscope.png"},
   {img: "../../assets/homepageimages/cancer-horoscope.png"},
  {img: "../../assets/homepageimages/leo-horoscope.png"},
  {img: "../../assets/homepageimages/virgo-horoscope.png"},
  {img: "../../assets/homepageimages/libra-horoscope.png"},
  {img: "../../assets/homepageimages/scorpio-horoscope.png"},
  {img: "../../assets/homepageimages/sagi-horoscope.png"},
   {img: "../../assets/homepageimages/capricon-horoscope.png"},
  {img: "../../assets/homepageimages/aquarius-horoscope.png"},
  {img: "../../assets/homepageimages/pisces-horoscope.png"}
];
specialservices=[
  {img: "../../assets/homepageimages/accomdation248x300.png"},
  {img: "../../assets/homepageimages/beauty248x300.png"},
  {img: "../../assets/homepageimages/catering248x300.png"},
   {img: "../../assets/homepageimages/culturalevent248x300.png"},
  {img: "../../assets/homepageimages/flowerdecoration248x300.png"},
  {img: "../../assets/homepageimages/functionhallfinder248x300.png"},
  {img: "../../assets/homepageimages/housekeeping248x300.png"},
  {img: "../../assets/homepageimages/matrimonial248x300.png"},
  {img: "../../assets/homepageimages/ornamentdesign248x300.png"},
   {img: "../../assets/homepageimages/photoshoot248x300.png"},
  {img: "../../assets/homepageimages/texttiledesign248x300.png"},
  {img: "../../assets/homepageimages/transport248x300.png"}
]
singleslideConfig={
  "slidesToShow": 1,
  "slidesToScroll": 1,
  "nextArrow": "<div  class='nav-btn next-slide' style='color:white'>&#8250</div>",
  "prevArrow": "<div class='nav-btn prev-slide' style='color:white'>&#8249</div>",
  "dots": true,
  "infinite": false,
  "arrows": false,
}
fourslideConfig = {
  "slidesToShow": 4,
  "slidesToScroll": 1,
  "nextArrow": "<div  class='nav-btn next-slide' style='color:white'>&#8250</div>",
  "prevArrow": "<div class='nav-btn prev-slide' style='color:white'>&#8249</div>",
  "dots": true,
  "infinite": false,
  "arrows": false,
 
}
fiveslideConfig={
  "slidesToShow": 5,
  "slidesToScroll": 1,
  "nextArrow": "<div  class='nav-btn next-slide' style='color:white'>&#8250</div>",
  "prevArrow": "<div class='nav-btn prev-slide' style='color:white'>&#8249</div>",
  "dots": true,
  "infinite": false,
  "arrows": false,
}
sixslideConfig={
  "slidesToShow": 5,
  "slidesToScroll": 1,
  "nextArrow": "<div  class='nav-btn next-slide' style='color:white'>&#8250</div>",
  "prevArrow": "<div class='nav-btn prev-slide' style='color:white'>&#8249</div>",
  "dots": true,
  "infinite": false,
  "arrows": false,
}

eightslideConfig={
  "slidesToShow": 5,
  "slidesToScroll": 1,
  "nextArrow": "<div  class='nav-btn next-slide' style='color:white'>&#8250</div>",
  "prevArrow": "<div class='nav-btn prev-slide' style='color:white'>&#8249</div>",
  "dots": true,
  "infinite": false,
  "arrows": false,
}
specialslideConfig={
  "slidesToShow": 5,
  "slidesToScroll": 1,
  "nextArrow": "<div  class='nav-btn next-slide' style='color:white'>&#8250</div>",
  "prevArrow": "<div class='nav-btn prev-slide' style='color:white'>&#8249</div>",
  "dots": true,
  "infinite": false,
  "arrows": false,
}


slickInit(e) {
  console.log('slick initialized');
}

breakpoint(e) {
  console.log('breakpoint');
}

afterChange(e) {
  console.log('afterChange');
}

beforeChange(e) {
  console.log('beforeChange');
}

  constructor(config: NgbCarouselConfig,private activatedRoute:ActivatedRoute,private router:Router,private homeService:HomeService, private utilitiesService :UtilitiesService,private toastService: ToastService) {
    config.interval = 10000;
    config.keyboard = true;
    config.pauseOnHover = true;
   }
  ngOnInit(): void {

    if(sessionStorage.getItem("userInfo")!=null)
    {
        this.isLogin=true;
        console.log(this.isLogin)
        this.userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
        console.log(this.userInfo.name)
        this.username=this.userInfo.name;
        this.isVendor=this.userInfo.userTypeId=="2" ? true : false;

    }
   else
   {
     this.isLogin=false;
     console.log(this.isLogin)
   }
   this.cityId=1;
   this.languageName='Telugu';
   this.getCity();
   this. getLanguages();
   this.getServiceTypes(this.cityId);
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
  onEnrollmentClick()
  {
    this.enrollment=!this.enrollment;
    if(this.enrollment==false)
    {
      document.getElementById("contentdiv").style.width = "0";
      document.getElementById("btndiv").style.marginRight = "0";
    }
    if(this.enrollment==true)
    {
      document.getElementById("contentdiv").style.width = "250px";
      document.getElementById("btndiv").style.marginRight = "250px";
    }
 
  }
  getLanguages()
{
  this.utilitiesService.getlanguages().subscribe(
    (data) => {
        if (data) {
            this.Languages = data;
            console.log(data)
        }
      },
      (error) => {
        this.errorMessage = error;
    },
    () => {
    }
);
}
  getCity()
  {

    this.utilitiesService.getCities(0).subscribe(
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
  getServiceTypes(cityid)
  {
    this.homeService.getServiceTypes(cityid).subscribe(
      (data) => {
          if (data) {
              this.serviceTypes = data;
              console.log(data)
          }

      },
      (error) => {
          this.errorMessage = error;
      },
      () => {

      });
  }
  selectCity(event:any)
  {
    this.cityId=event.target.value;
    this.getServiceTypes(this.cityId);
  }
  
  Search(search)
  {
    this.homeService.SearchService(search,this.cityId).subscribe(
      (data) => {
          if (data) {
              this.services = data;
          }

      },
      (error) => {
          this.errorMessage = error;
      },
      () => {

      });
  }
  searchService(serviceName): void {
    this.flag = true;
    this.Search(serviceName);
  }
  onselectItem(item)
  {
    if (item.serviceId != 0) {
      this.serviceName = item.serviceName;
      this.serviceId=item.serviceId;
      this.flag = false;
    }
    else {
      return false;
    }
  }
  OnSearchClick()
  {
    if(this.serviceName!=undefined && this.serviceName!="" && this.serviceId!=0)
    {

    }
  }
 
}
