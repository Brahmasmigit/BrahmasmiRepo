import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminDashboardService } from './admindashboard.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UtilitiesService } from '../../shared/services/utilities.service';
import { ToastService } from '../../shared/services/toastservice';
import { AdminMeetingService } from '../adminmeeting/adminmeeting.service';
import { Vendor } from './admindashboard.model';
// import { MultipleVendorList } from './admindashboard.model';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  adminDasboard: [] = [];
  errorMessage: any;
  booking: any = {};
  completedRequests: number;
  totalRequests: number;
  pendingRequests: number;
  closeResult: string;
  City: any = [];
  cityId: any;
  vendorlist: any = [];
  HighlightRow: any;
  vendorId: any = "";
  bookingId: any;
  vendorupdate: any = {};
  loginModel: any = {};
  isMeeting: any = false;
  isAssignVendor: any = false;
  selectedVendorData: Vendor[];
  // multipleVendorList: MultipleVendorList[] = {} as MultipleVendorList[];
  @ViewChild('mymodal') mymodal: ElementRef;
  constructor(private activatedRoute: ActivatedRoute,
    private adminMeetingService: AdminMeetingService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private utilitiesService: UtilitiesService,
    private adminDashboardService: AdminDashboardService) { }

  ngOnInit(): void {
    this.getbookingData();
    this.cityId = 1;
    this.getCity();
    this.selectedVendorData = {} as Vendor[];
  }
  getCity() {

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
  selectCity(event: any) {
    this.cityId = event.target.value;
    this.getVendors(this.cityId);
  }
  getVendors(cityId: any) {
    this.utilitiesService.getVendor(cityId).subscribe(
      (data) => {
        if (data) {
          this.vendorlist = data;

        }

      },
      (error) => {
        this.errorMessage = error;
      },
      () => {
      });
  }

  getbookingData() {
    let statusid = 0;
    let bookingdate = null;
    this.adminDashboardService.getbookingdata(statusid, bookingdate).subscribe(
      (data) => {
        if (data) {
          this.adminDasboard = data;
          console.log('data', this.adminDasboard);
          this.totalRequests = this.adminDasboard.length;
          this.completedRequests = this.adminDasboard.filter((c: any) =>
            c.bookingStatusID == "5"
          ).length;
          this.pendingRequests = this.adminDasboard.filter((c: any) =>
            c.bookingStatusID != "5" && c.bookingStatusID != "4"
          ).length;

          // this.adminDasboard.forEach((item: any) => {
          //   let data = {} as MultipleVendorList;
          //   if (item.vendorListIds != null) {
          //     data.BookingId = item.bookingId;
          //     data.ServiceId = item.serviceId;
          //     data.VendorListId = item.vendorListIds.split(',');
          //     data.VendorListName = item.vendorListNames.split(',');
          //     this.multipleVendorList.push(data);
          //   }
          // })

          this.adminDasboard.forEach((item: any) => {
            if (item.vendorListIds != null) {
              item.vendorIdData = item.vendorListIds.split(',');
              item.vendorNameData = item.vendorListNames.split(',');
            }
          })

          console.log('dp', this.adminDasboard);
        }

      },
      (error) => {
        this.errorMessage = error;
      },
      () => {

      });
  }

  ChangeStatus(bookingid, statusid, vendorname, bookingType,mobilenumber,emailID) {
    // if (vendorname == undefined || vendorname == "" && statusid != 4) {
    //   this.showError("Please Assign Vendor before Approve");
    //   return;
    // }

    if (vendorname == undefined || vendorname == "" || vendorname == null) {
      if (this.selectedVendorData == null || this.selectedVendorData == undefined || this.selectedVendorData.length == undefined || this.selectedVendorData.length == 0) {
        this.showError("Please Assign Vendor before Approve");
        return;
      }
    }

    this.booking.BookingId = Number(bookingid);
    this.booking.BookingStatusId = Number(statusid);
    this.booking.Vendor_MobileNumber = mobilenumber;
    this.booking.Vendor_EmailID = emailID;
    this.booking.VendorName=vendorname;
   
    if (this.selectedVendorData.length > 1) {
      this.showError("Please Assign One Vendor!");
      return;
    }
    if (this.selectedVendorData.length > 0) {

      this.booking.serviceId = this.selectedVendorData[0].serviceId;
      this.booking.vendorIdList = this.selectedVendorData.map(data => data.vendorId).join(',');
    }

    console.log('bk', this.booking);

    this.adminDashboardService.ChangeBookingStatus(this.booking).subscribe(
      (data) => {
        if (data) {
          if (data == "1") {
            this.getbookingData();
          }
          else {
            this.errorMessage = "Record not updated, please try after some time."
          }
        }

      },
      (error) => {
        this.errorMessage = error;
      },
      () => {

      });
  }
  AssignVendor(bookingid) {
    this.bookingId = bookingid;
    this.vendorId = "";
    this.HighlightRow = -1;
    this.cityId = 1;
    this.getVendors(1);
    this.isAssignVendor = true;
    this.isMeeting = false;
    this.modalplaceOrder(this.mymodal);
  }
  SelectVendor(vendorid, index) {
    this.HighlightRow = index;
    this.vendorId = vendorid;
  }
  AddMeeting(bookingid, statusid, vendorname) {
    if (vendorname == undefined || vendorname == "") {
      this.showError("Please Assign Vendor before Adding Meeting");
      return;
    }
    this.isAssignVendor = false;
    this.isMeeting = true;
    this.bookingId = bookingid;
    this.modalplaceOrder(this.mymodal);
  }
  CreateMeeting() {
    if (this.loginModel.MeetingId == undefined || this.loginModel.MeetingId == "") {
      this.showError("Please Enter Meeting Id");
      return;
    }
    if (this.loginModel.MeetingPassword == undefined || this.loginModel.MeetingPassword == "") {
      this.showError("Please Enter Meeting Password");
      return;
    }

    this.loginModel.Signature = "";
    this.loginModel.BookingId = Number(this.bookingId);
    this.adminMeetingService.ScheduleMeeting(this.loginModel).subscribe(
      (data) => {
        if (data) {
          this.modalService.dismissAll("done");
          if (data == "1") {
            this.showError("Meeting Scheduled Successfully.");
          }
          else {
            this.errorMessage = "Record not updated, please try after some time."
          }
        }

      },
      (error) => {
        this.errorMessage = error;
      },
      () => {

      });
  }
  SubmitVendor() {
    if (this.vendorId == undefined || this.vendorId == "") {
      this.showError("Please Select Vendor");
      return;
    }
    this.vendorupdate.BookingId = Number(this.bookingId);
    this.vendorupdate.VendorId = Number(this.vendorId);

    this.adminDashboardService.UpdateVendor(this.vendorupdate).subscribe(
      (data) => {
        if (data) {
          this.vendorId = "";
          this.modalService.dismissAll("done");
          if (data == "1") {

            this.getbookingData();
          }
          else {
            this.errorMessage = "Record not updated, please try after some time."
          }
        }

      },
      (error) => {
        this.vendorId = "";
        this.errorMessage = error;
      },
      () => {

      });
  }

  shareServiceCheckedVendorList(vendorData: Vendor[]) {
    console.log('ve', vendorData);
    this.selectedVendorData = {} as Vendor[];
    this.selectedVendorData = vendorData;
  }
  showError(msg) {
    this.toastService.show(msg, {
      classname: 'bg-info text-light',
      delay: 3000,
      autohide: true,
      headertext: 'Admin!'
    });
  }
  modalplaceOrder(content) {
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
  ngOnDestroy() {
  }

}
