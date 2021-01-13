import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceData, TempleDashboardLoggedInUser, TempleOrderDetailsAccommodation, TempleOrderDetailService, TempleUserDashboardModel, TempleUserInvoiceData, TempleUserServiceData } from 'src/app/admin/admintempleservices/templeservice.model';
import { TempleService } from '../templeService.service';

@Component({
  selector: 'app-templeuserdashboard',
  templateUrl: './templeuserdashboard.component.html',
  styleUrls: ['./templeuserdashboard.component.css']
})
export class TempleUserDashboardComponent implements OnInit {

  stars: any = {};
  userInfo: any = {};
  userid: any;
  templeUserDashboardData: TempleUserDashboardModel[] = {} as TempleUserDashboardModel[];
  templeInvoiceData: TempleUserInvoiceData[] = {} as TempleUserInvoiceData[];
  templeServiceData: TempleUserServiceData[] = {} as TempleUserServiceData[];
  selectedTempleInvoiceData: TempleUserServiceData[] = {} as TempleUserServiceData[];

  tmpInvData: TempleUserInvoiceData = {} as TempleUserInvoiceData;
  tmpSerData: TempleUserServiceData = {} as TempleUserServiceData;
  @ViewChild('mymodal') mymodal: ElementRef;
  closeResult: string;
  loggedUser: TempleDashboardLoggedInUser = {} as TempleDashboardLoggedInUser;
  templeServiceDetails: TempleOrderDetailService[] = {} as TempleOrderDetailService[];
  serviceDetailView: TempleOrderDetailService[] = {} as TempleOrderDetailService[];
  templeAccommodationDetails: TempleOrderDetailsAccommodation[] = {} as TempleOrderDetailsAccommodation[];
  accommodationDetailView: TempleOrderDetailsAccommodation[] = {} as TempleOrderDetailsAccommodation[];

  invoiceDetails: InvoiceData[] = {} as InvoiceData[];

  isRating: boolean = false;
  totalAmount: number;

  constructor(private router: Router, private templeService: TempleService, private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(sessionStorage.getItem('userInfo'));
    this.GetUserDashBoardData();
    console.log('user', sessionStorage.getItem('userInfo'));
    console.log('user1', this.loggedUser);
    this.invoiceDetails = [];
    this.serviceDetailView = [];
  }

  GetUserDashBoardData() {
    this.templeService.GetTempleUserDashboard(this.loggedUser.userId).subscribe((data) => {
      if (data) {
        // this.templeUserDashboardData = data;
        // console.log('data', this.templeUserDashboardData)
        this.templeServiceDetails = data["item1"];
        this.templeAccommodationDetails = data["item2"];

        this.templeServiceDetails.forEach(temple => {
          let item = {} as InvoiceData;
          item.invoice = temple.invoice;
          item.templeName = temple.templeName;
          item.templeState = temple.templeState;
          item.templeCity = temple.templeCity;
          item.paymentDate = temple.paymentDate;
          item.bookingStatus = temple.bookingStatus;

          if (this.invoiceDetails.length == 0)
            this.invoiceDetails.push(item);
          else if (!this.invoiceDetails.some(det => det.invoice == item.invoice)) {
            this.invoiceDetails.push(item);
          }
        });

        console.log('in', this.invoiceDetails);

        console.log('tmpser', this.templeServiceDetails);
        console.log('tmpacc', this.templeAccommodationDetails);
      }
    });
  }

  // GetUserDashBoardData() {
  //   this.templeInvoiceData = [];
  //   this.templeServiceData = [];
  //   this.templeService.GetTempleUserDashboard(this.loggedUser.userId).subscribe((result) => {
  //     if (result) {
  //       this.templeDashboardData = result;
  //       console.log('dash', this.templeDashboardData);

  //       this.templeDashboardData.forEach(x => {

  //         this.tmpInvData = {} as TempleUserInvoiceData;

  //         this.tmpInvData.invoiceNo = x.invoiceNo;
  //         this.tmpInvData.userId = x.userId;
  //         this.tmpInvData.templeId = x.templeId;
  //         this.tmpInvData.templeName = x.templeName;
  //         this.tmpInvData.roomTypeId = x.roomTypeId;
  //         this.tmpInvData.roomType = x.roomType;
  //         this.tmpInvData.roomPrice = x.roomPrice;
  //         this.tmpInvData.darshanTypeId = x.darshanTypeId;
  //         this.tmpInvData.darshanType = x.darshanType;
  //         this.tmpInvData.darshanPrice = x.darshanPrice;
  //         this.tmpInvData.totalAmount = x.totalAmount;
  //         this.tmpInvData.modeOfPayment = x.modeOfPayment;
  //         if (!this.templeInvoiceData.some(usrData => usrData.invoiceNo == this.tmpInvData.invoiceNo))
  //           this.templeInvoiceData.push(this.tmpInvData);

  //         this.tmpSerData = {} as TempleUserServiceData;

  //         this.tmpSerData.serviceId = x.serviceId;
  //         this.tmpSerData.serviceName = x.serviceName;
  //         this.tmpSerData.bookingAmount = x.bookingAmount;
  //         this.tmpSerData.bookingDate = x.bookingDate;
  //         this.tmpSerData.bookingDateTime = x.bookingDateTime;
  //         this.tmpSerData.orderNo = x.orderNo;
  //         this.tmpSerData.invoiceNo = x.invoiceNo;
  //         this.tmpSerData.templeId = x.templeId;
  //         // if (!this.templeServiceData.some(serData => serData == this.tmpSerData))
  //         this.templeServiceData.push(this.tmpSerData);
  //       })
  //       console.log('tmpinvdata', this.templeInvoiceData);
  //       console.log('tmpserData', this.templeServiceData);
  //     }
  //   })
  // }

  ShowServiceInfo(templeId: number, invoiceNo: string) {
    console.log('click', templeId, invoiceNo);
    this.DisplaySelectedInvoiceData(templeId, invoiceNo);
  }

  DisplaySelectedInvoiceData(templeId: number, invoiceNo: string) {
    this.selectedTempleInvoiceData = [];
    this.selectedTempleInvoiceData = this.templeServiceData.filter(tmp => tmp.invoiceNo == invoiceNo && tmp.templeId == templeId);
    console.log('sele', this.selectedTempleInvoiceData);
    this.placeOrder(this.mymodal);
  }

  OpenModalPopup(popup, invoice: string) {
    if (popup == "booking") {
      this.isRating = false;
    }
    else {
      this.isRating = true;
    }
    this.serviceDetailView = this.templeServiceDetails.filter(x => x.invoice == invoice);
    this.accommodationDetailView = this.templeAccommodationDetails.filter(x => x.invoice == invoice);
    this.totalAmount = this.templeServiceDetails.filter(x => x.invoice == invoice)[0].totalAmount;
    this.placeOrder(this.mymodal);
  }

  placeOrder(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "xlModal" }).result.then((result) => {
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
      return `with: ${reason}`;
    }
  }
}
