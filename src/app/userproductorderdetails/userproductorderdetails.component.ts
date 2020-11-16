import { Component, OnInit , ViewChild,  ElementRef,Renderer2 } from '@angular/core';
import {UserProductOrderDetailsService} from './userproductorderdetails.service';
import { ActivatedRoute, Router } from '@angular/router';
import {ToastService} from '../shared/services/toastservice';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-userproductorderdetails',
  templateUrl: './userproductorderdetails.component.html',
  styleUrls: ['./userproductorderdetails.component.css']
})
export class UserproductorderdetailsComponent implements OnInit {
  orderdetails:any=[];
  orders:any=[];
  errorMessage:any;
  invoiceno:any;

  isReload:boolean=false;
  userId:any;
  counts:any ;
  orderStatus:any = "In Progress"
  orderli:any={};
  bookingstatusid:any;
  closeResult:string;
  userInfo:any;
  @ViewChild('mymodal') mymodal: ElementRef;
  constructor(private toastService: ToastService,private activatedRoute: ActivatedRoute,
    private userProductOrderDetailsService:UserProductOrderDetailsService,  private  modalService: NgbModal,
    private router:Router) { }

  ngOnInit(): void {
   // this.counts= ["Recieved","In Progress","Ready for Billing","Billed","Order Closed"];

   if(sessionStorage.getItem("userInfo")!=null)
   {
     this.userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
     this.userId=this.userInfo.userId;
    this.getUserProductOrderdetails(this.userId,"","current");
   }
   else
   {
     this.router.navigate(['/login']);
   }

  }
  getUserProductOrderdetails(userid,usertype,calendartype)
  {
    this.userProductOrderDetailsService.getUserProductOrderdetails(userid,usertype,calendartype).subscribe(
      (data) => {
          if (data) {
              this.orderdetails = data;
          }
      },
      (error) => {
          this.errorMessage = error;
      },
      () => {
      }
  );
  }
  CalendarTab(CalendarTab)
  {
    this.getUserProductOrderdetails(this.userId,"",CalendarTab);
  }
  ViewDetails(item)
  {

  }

  OpenModalPopup(item)
  {
 //   1	Order Created
//2	Order Accepted
////3	Order InProcess
//4	Order Cancelled
//5	Order Completed
//6	Order Review
//7	On Hold
////8	On the way
//9	Order Delivered
//10	Order Picked up
//11	Order Ready
    if(item.bookingStatusId==2 || item.bookingStatusId==3 || item.bookingStatusId==11)
    {
      this.orderli.li1=true;
      this.orderli.li2=false;
      this.orderli.li3=false;
      this.orderli.li4=false;
      this.orderli.li5=false;
    }
    else if(item.bookingStatusId==10)
    {
      this.orderli.li1=true;
      this.orderli.li2=true;
      this.orderli.li3=false;
      this.orderli.li4=false;
      this.orderli.li5=false;
    }
    else if(item.bookingStatusId==8)
    {
      this.orderli.li1=true;
      this.orderli.li2=true;
      this.orderli.li3=true;
      this.orderli.li4=false;
      this.orderli.li5=false;

    }
    else if(item.bookingStatusId==9)
    {
      this.orderli.li1=true;
      this.orderli.li2=true;
      this.orderli.li3=true;
      this.orderli.li4=true;
      this.orderli.li5=false;

    }
    else if(item.bookingStatusId==5)
    {
      this.orderli.li1=true;
      this.orderli.li2=true;
      this.orderli.li3=true;
      this.orderli.li4=true;
      this.orderli.li5=true;

    }
    else
    {
      this.orderli.li1=false;
      this.orderli.li2=false;
      this.orderli.li3=false;
      this.orderli.li4=false;
      this.orderli.li5=false;
    }
    this.placeOrder(this.mymodal);
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
  showError(msg) {
    this.toastService.show(msg, {
      classname: 'bg-info text-light',
      delay: 5000 ,
      autohide: true,
      headertext: 'Store details!'
    });
  }

}
