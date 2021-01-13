import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccommodationRequest, AccommodationTimings, City, ServiceDetailDateTime, ServiceRequest, ServicesTimings, State, Temple, TempleUserServiceRequest, UserServiceRequest } from 'src/app/admin/admintempleservices/templeservice.model';
import { TempleAdminService } from 'src/app/admin/admintempleservices/templeAdminService.services';
import { TempleService } from '../templeService.service';
import { ToastService } from 'src/app/shared/services/toastservice';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-temple-details',
  templateUrl: './temple-details.component.html',
  styleUrls: ['./temple-details.component.css']
})
export class TempleDetailsComponent implements OnInit {

  templeId: number;
  templeDetails: Temple;
  errorMessage: any;
  servicesTimings: ServicesTimings[] = [];
  serviceRequest: TempleUserServiceRequest = {} as TempleUserServiceRequest;
  serviceDetails: TempleUserServiceRequest = {} as TempleUserServiceRequest;
  userDetails: TempleUserServiceRequest = {} as TempleUserServiceRequest;
  bookedService: TempleUserServiceRequest[] = {} as TempleUserServiceRequest[];

  userServiceRequest: UserServiceRequest = {} as UserServiceRequest;

  accommodationTimings: AccommodationTimings[] = [];

  selectedServiceDetails: ServiceDetailDateTime[] = [];
  serviceDetailDateTime: ServiceDetailDateTime[] = [];
  selectedAccommodationDetails: AccommodationTimings[] = [];

  Cities: City;
  States: State;
  displayAcmd: boolean = false;
  multiServiceDateTime: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private templeAdminService: TempleAdminService, private templeService: TempleService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.bookedService = [];
    this.userServiceRequest.serviceDetails = [];
    this.userServiceRequest.accommodationDetails = [];
    this.userDetails.AcmdNoOfDays = 100;

    if (JSON.parse(sessionStorage.getItem("templeServiceDetails")) != null || JSON.parse(sessionStorage.getItem("templeServiceDetails")) != undefined)
      this.BindServiceDetails();

    this.route.queryParams.subscribe(params => {
      this.templeId = params["TempleId"];
    });

    this.ShowTempleDetails(this.templeId);
    this.getServiceTimings(this.templeId);
    this.getAccommodationTimings(this.templeId);
  }

  BindServiceDetails() {
    console.log('bind', JSON.parse(sessionStorage.getItem("templeServiceDetails")));

    this.userServiceRequest = JSON.parse(sessionStorage.getItem("templeServiceDetails"));
    this.userDetails.UserName = this.userServiceRequest.UserName;
    this.userDetails.UserEmail = this.userServiceRequest.UserEmail;
    this.userDetails.UserMobileNo = this.userServiceRequest.UserMobileNo;
    this.userDetails.AcmdNoOfDays = this.userServiceRequest.AcmdNoOfDays;
    this.userDetails.UserRequestQuery = this.userServiceRequest.UserRequestQuery;
  }

  ShowTempleDetails(templeId: number) {
    this.templeAdminService.GetTemples(templeId).subscribe((data) => {
      if (data) {
        this.templeDetails = data[0];
      }
    },
      (error) => {
        this.errorMessage = error;
      });
  }

  getServiceTimings(templeId: number) {
    this.templeAdminService.GetServicesTimings(templeId).subscribe((data) => {
      if (data) {
        this.servicesTimings = data;
      }
    },
      (error) => {
        this.errorMessage = error;
      });
  }

  getAccommodationTimings(templeId: number) {
    this.templeAdminService.GetAccommodationTimings(templeId).subscribe((data) => {
      if (data) {
        this.accommodationTimings = data;
      }
    },
      (error) => {
        this.errorMessage = error;
      });
  }

  onSubmit(form: NgForm) {
    var dateTimeValid: boolean = true;
    if (form.invalid)
      return;

    if (this.selectedServiceDetails.length == 0) {
      this.showError("Atleast one service should be selected.");
      return;
    }

    this.userServiceRequest.UserName = this.userDetails.UserName;
    this.userServiceRequest.UserEmail = this.userDetails.UserEmail;
    this.userServiceRequest.UserMobileNo = this.userDetails.UserMobileNo;
    this.userServiceRequest.UserRequestQuery = this.userDetails.UserRequestQuery;

    this.userServiceRequest.TempleId = JSON.parse(this.templeId.toString());
    this.userServiceRequest.TempleCityId = this.templeDetails.cityId;
    this.userServiceRequest.TempleStateId = this.templeDetails.stateId;

    this.userServiceRequest.AcmdNoOfDays = this.userDetails.AcmdNoOfDays;

    this.userServiceRequest.serviceDetails = [];

    if (this.multiServiceDateTime) {

      this.selectedServiceDetails.some((service) => {
        let item = service.bookingDate.toString();
        if (!item.includes("-") || service.bookingTime == "") {
          dateTimeValid = false;
          return true;
        }
      });

      if (!dateTimeValid == true) {
        this.showError("Booking date or time should be selected for all services");
        return;
      }

      this.selectedServiceDetails.forEach(service => {
        var item = {} as ServiceRequest;
        item.ServiceId = service.serviceId;
        item.ServiceName = service.serviceName;
        item.ServicePrice = service.servicePrice;
        item.BookingDate = service.bookingDate;
        item.BookingTime = service.bookingTime;
        this.userServiceRequest.serviceDetails.push(item);
      });
    } else {
      this.selectedServiceDetails.forEach(service => {
        var item = {} as ServiceRequest;
        item.ServiceId = service.serviceId;
        item.ServiceName = service.serviceName;
        item.ServicePrice = service.servicePrice;
        item.BookingDate = this.serviceDetails.BookingDate
        item.BookingTime = this.serviceDetails.BookingTime;
        this.userServiceRequest.serviceDetails.push(item);
      });
    }

    this.userServiceRequest.accommodationDetails = [];

    if (this.selectedAccommodationDetails.length > 0) {
      this.selectedAccommodationDetails.forEach(acmd => {
        var item = {} as AccommodationRequest;
        item.RoomTypeId = acmd.roomTypeId;
        item.RoomType = acmd.roomType;
        item.RoomPrice = acmd.roomPrice;
        // item.RoomBookingDate = this.serviceDetails.AcmdDate;
        item.CheckInDate = this.serviceDetails.CheckInDate;
        item.CheckInTime = this.serviceDetails.CheckInTime;
        item.CheckOutDate = this.serviceDetails.CheckOutDate;
        item.CheckOutTime = this.serviceDetails.CheckOutTime;
        this.userServiceRequest.accommodationDetails.push(item);
      })
    }
    console.log('finalsave', this.userServiceRequest);

    sessionStorage.setItem("templeServiceDetails", JSON.stringify(this.userServiceRequest));

    this.router.navigate(['/templeserviceusercart']);
  }

  shareServiceCheckedList(items: ServiceDetailDateTime[]) {
    this.selectedServiceDetails = items;
    this.selectedServiceDetails.forEach(service => {
      service.bookingDate = new Date();
      service.bookingTime = "";
    });
  }

  shareAcmdCheckedlist(items: AccommodationTimings[]) {
    this.selectedAccommodationDetails = items;
  }

  AcmbCb() {
    this.displayAcmd = !this.displayAcmd;
  }

  MultipleServicesDateTime() {
    this.multiServiceDateTime = !this.multiServiceDateTime;
  }

  showError(msg) {
    this.toastService.show(msg, {
      classname: 'bg-danger text-light',
      delay: 5000,
      autohide: true,
      headertext: 'Temple Service Booking!'
    });
  }
}