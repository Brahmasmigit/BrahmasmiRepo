import { Component, OnInit, ViewChild,  ElementRef,Renderer2  } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {UserDashboardService} from './userdashboard.service';
import {EventModel} from '../shared/models/eventmodel';
import {EventListenerService} from '../shared/services/eventlistener.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {VendorDashboardService} from '../vendordashboard/vendordashboard.service';
import {ToastService} from '../shared/services/toastservice'

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
  ongoing:[]=[];
  errorMessage:any;
  serviceSubscription:any;
  test:any;
  userid:any;
  userInfo:any={}
  closeResult: string;
  booking:any={};
  isRating:boolean=false;
  stars:any={};
  feedback:any={};
  starCount:number=0;
  @ViewChild('mymodal') mymodal: ElementRef;
  constructor(private activatedRoute: ActivatedRoute,
    private userDashboardService:UserDashboardService,
    private router:Router,
    private  modalService: NgbModal,
    private renderer:Renderer2,
    private vendorDashboardService:VendorDashboardService,
    private toastService: ToastService,
    private eventListenerService:EventListenerService)
    {
      /*this.serviceSubscription = this.eventListenerService.on("Accept", ((res) => {
        console.log(res);
        this.test=res;
    }));*/
    }

  ngOnInit(): void {

    this.stars.star1=false;
    this.stars.star2=false;
    this.stars.star3=false;
    this.stars.star4=false;
    this.stars.star5=false;
    if(sessionStorage.getItem("userInfo")!=null)
    {
      this.userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
      console.log(this.userInfo)
      if(this.userInfo.userTypeId=="1")
      {
      this.userid=this.userInfo.userId;
      this.getOngoing(this.userid,"current");
      }
      else
      {
        this.router.navigate(['/login']);
      }
    }
    else
    {
      this.router.navigate(['/login']);
    }

  }
  getOngoing(userid,calendartab)
  {
    this.userDashboardService.getOngoing(userid,calendartab).subscribe(
      (data) => {
          if (data) {
              this.ongoing = data;
          }

      },
      (error) => {
          this.errorMessage = error;
      },
      () => {

      });
  }
  CalendarTab(CalendarTab)
  {
    this.getOngoing(this.userid,CalendarTab);
  }

  CancelBooking(bookingid,statusid)
  {
    if(confirm("Are you sure to Cancel the Booking?")) {
    this.booking.BookingId=Number(bookingid);
    this.booking.BookingStatusId=Number(statusid);

    this.vendorDashboardService.ChangeBookingStatus(this.booking).subscribe(
      (data) => {
          if (data) {
              if(data=="1")
              {
                this.modalService.dismissAll("done");
                this.getOngoing(this.userid,"current");
              }
              else
              {
                this.errorMessage ="Record not updated, please try after some time."
              }
          }

      },
      (error) => {
          this.errorMessage = error;
      },
      () => {

      });
    }
  }
  Meeting(bookingId)
  {
    sessionStorage.setItem("BookingId",bookingId);
    this.router.navigate(['/zoomuser']);
  }
  OpenModalPopup(popup)
  {
    if(popup=="booking")
    {
      this.isRating=false;
    }
    else
    {
      this.isRating=true;
    }
    this.placeOrder(this.mymodal);
  }
  GiveRating(event,star:any,val:boolean)
  {

    if(star==1)
    {
    this.stars.star1 = !val;
    this.stars.star2 = false;
    this.stars.star3 = false;
    this.stars.star4 =false;
    this.stars.star5 =false;
    this.starCount= val ==true ? 0:1;
    }
    else if(star==2)
    {
      this.stars.star1 = true;
      this.stars.star2 = !val;
      this.stars.star3 = false;
      this.stars.star4 =false;
      this.stars.star5 =false;
      this.starCount= val ==true ? 1:2;
    }
    else if(star==3)
    {
      this.stars.star1 = true;
      this.stars.star2 = true;
      this.stars.star3 = !val;
      this.stars.star4 =false;
      this.stars.star5 =false;
      this.starCount= val ==true ? 2:3;
    }
    else if(star==4)
    {
      this.stars.star1 = true;
      this.stars.star2 = true;
      this.stars.star3 = true;
      this.stars.star4 = !val;
      this.stars.star5 =false;
      this.starCount= val ==true ? 3:4;
    }
    else if(star==5)
    {
      this.stars.star1 = true
      this.stars.star2 = true;
      this.stars.star3 = true;
      this.stars.star4 = true;
      this.stars.star5 = !val;
      this.starCount= val ==true ? 4:5;
    }
  }
  SubmitFeedback(bookingid)
  {
    if(this.starCount!=0)
    {
    this.feedback.RatingStars=this.starCount;
    this.feedback.BookingId=Number(bookingid);

    this.userDashboardService.UserRatings(this.feedback).subscribe(
      (data) => {
          if (data) {
              if(data=="1")
              {
                this.stars.star1 = false;
                this.stars.star2 = false;
                this.stars.star3 = false;
                this.stars.star4 =false;
                this.stars.star5 =false;
                this.feedback.ReviewComments="";
                this.showError("Ratings are Submitted Successfully.");
                this.modalService.dismissAll("done");
              }
              else
              {
                this.errorMessage ="Record not updated, please try after some time."
              }
          }

      },
      (error) => {
          this.errorMessage = error;
      },
      () => {

      });
    }
    else
    {
        this.showError("Please provide Rating");
    }

  }
  showError(msg) {
    this.toastService.show(msg, {
      classname: 'bg-info text-light',
      delay: 4000 ,
      autohide: true,
      headertext: 'Profile!'
    });
  }
  placeOrder(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass : "xlModal"}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  ngOnDestroy() {
  }


}
