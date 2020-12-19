import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { City, ServicesTimings, State, Temple, TempleUserServiceRequest, UserServiceRequest } from 'src/app/admin/admintempleservices/templeservice.model';
import { TempleAdminService } from 'src/app/admin/admintempleservices/templeAdminService.services';
import { TempleService } from '../templeService.service';
import { ToastService } from 'src/app/shared/services/toastservice';
import { NgForm } from '@angular/forms';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';

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

  Cities: City;
  States: State;

  constructor(private route: ActivatedRoute, private router: Router, private templeAdminService: TempleAdminService, private templeService: TempleService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.bookedService = [];
    // this.serviceRequest.ServiceId = 0;
    // this.serviceRequest.RoomTypeId = 0;
    // this.serviceRequest.DarshanTypeId = 0;
    this.serviceDetails.ServiceId = 0;
    this.userDetails.RoomTypeId = 0;
    this.userDetails.DarshanTypeId = 0;
    this.userServiceRequest.serviceDetails = [];

    if (JSON.parse(sessionStorage.getItem("templeServiceDetails")) != null || JSON.parse(sessionStorage.getItem("templeServiceDetails")) != undefined)
      this.BindServiceDetails();

    this.route.queryParams.subscribe(params => {
      this.templeId = params["TempleId"];
    });

    this.ShowTempleDetails();
  }

  BindServiceDetails() {
    console.log('bind', JSON.parse(sessionStorage.getItem("templeServiceDetails")));

    this.userServiceRequest = JSON.parse(sessionStorage.getItem("templeServiceDetails"));
    this.userDetails.UserName = this.userServiceRequest.UserName;
    this.userDetails.UserEmail = this.userServiceRequest.UserEmail;
    this.userDetails.UserMobileNo = this.userServiceRequest.UserMobileNo;
    this.userDetails.RoomTypeId = this.userServiceRequest.RoomTypeId;
    this.userDetails.NoOfPerson = this.userServiceRequest.NoOfPerson;
    this.userDetails.DarshanTypeId = this.userServiceRequest.DarshanTypeId;
    this.userDetails.UserRequestQuery = this.userServiceRequest.UserRequestQuery;


    // this.bookedService = JSON.parse(sessionStorage.getItem("templeServiceDetails"));
    // this.userDetails.UserName = this.bookedService[0].UserName;
    // this.userDetails.UserEmail = this.bookedService[0].UserEmail;
    // this.userDetails.UserMobileNo = this.bookedService[0].UserMobileNo;
    // this.userDetails.RoomTypeId = this.bookedService[0].RoomTypeId;
    // this.userDetails.NoOfPerson = this.bookedService[0].NoOfPerson;
    // this.userDetails.DarshanTypeId = this.bookedService[0].DarshanTypeId;
    // this.userDetails.UserRequestQuery = this.bookedService[0].UserRequestQuery;

    // this.serviceRequest.UserName = this.bookedService[0].UserName;
    // this.serviceRequest.UserEmail = this.bookedService[0].UserEmail;
    // this.serviceRequest.UserMobileNo = this.bookedService[0].UserMobileNo;
    // this.serviceRequest.RoomTypeId = this.bookedService[0].RoomTypeId;
    // this.serviceRequest.NoOfPerson = this.bookedService[0].NoOfPerson;
    // this.serviceRequest.DarshanTypeId = this.bookedService[0].DarshanTypeId;
    // this.serviceRequest.UserRequestQuery = this.bookedService[0].UserRequestQuery;
  }

  ShowTempleDetails() {
    this.templeAdminService.GetTemples(this.templeId).subscribe((data) => {
      if (data) {
        this.templeDetails = data[0];
        this.getServiceTimings();
      }
    },
      (error) => {
        this.errorMessage = error;
      });
  }

  getServiceTimings() {
    this.templeAdminService.GetServicesTimings(this.templeId).subscribe((data) => {
      if (data) {
        this.servicesTimings = data;
        console.log('serv tim', this.servicesTimings);
      }
    },
      (error) => {
        this.errorMessage = error;
      });
  }

  onSubmit(form: NgForm) {
    if (form.invalid)
      return;
    // if (this.serviceRequest.ServiceId == 0) {
    //   this.showError("Please Select Service.");
    //   return;
    // }
    // if (Number(this.serviceRequest.DarshanTypeId) == 0) {
    //   this.showError("Please Select Darshan Type.");
    //   return;
    // }
    // if (this.serviceDetails.ServiceId == 0) {
    //   this.showError("Please Select Service.");
    //   return;
    // }
    if (Number(this.userDetails.DarshanTypeId) == 0) {
      this.showError("Please Select Darshan Type.");
      return;
    }

    if (!(this.userServiceRequest.serviceDetails.length > 0)) {
      if (Number(this.serviceDetails.ServiceId) == 0) {
        this.showError("Atleast one service should be selected.");
        return;
      }
    }

    // if (this.userServiceRequest.serviceDetails.length == 0 || Number(this.serviceDetails.ServiceId) == 0) {
    //   this.showError("Atleast one service should be selected.");
    //   return;
    // }


    this.userServiceRequest.UserName = this.userDetails.UserName;
    this.userServiceRequest.UserEmail = this.userDetails.UserEmail;
    this.userServiceRequest.UserMobileNo = this.userDetails.UserMobileNo;
    this.userServiceRequest.UserRequestQuery = this.userDetails.UserRequestQuery;

    this.userServiceRequest.TempleId = JSON.parse(this.templeId.toString());
    this.userServiceRequest.TempleCity = this.templeDetails.cityName;

    this.userServiceRequest.RoomTypeId = this.userDetails.RoomTypeId;
    this.userServiceRequest.RoomType = this.userDetails.RoomType = Number(this.userDetails.RoomTypeId) == 0 ? '' : (Number(this.userDetails.RoomTypeId) == 1 ? "AC" : "NonAC");
    this.userServiceRequest.RoomPrice = this.userDetails.RoomPrice = this.userDetails.RoomType == 'AC' ? 200 : 0;
    this.userServiceRequest.NoOfPerson = this.userDetails.NoOfPerson;

    this.userServiceRequest.DarshanTypeId = this.userDetails.DarshanTypeId;
    this.userServiceRequest.DarshanType = this.userDetails.DarshanType = Number(this.userDetails.DarshanTypeId) == 1 ? "Free" : "Paid";
    this.userServiceRequest.DarshanPrice = this.userDetails.DarshanPrice = this.userDetails.DarshanTypeId == 1 ? 0 : 100;

    if (Number(this.serviceDetails.ServiceId) != 0) {
      this.serviceDetails.ServiceId = JSON.parse(this.serviceDetails.ServiceId.toString());
      this.serviceDetails.ServiceName = this.servicesTimings.find(ser => ser.serviceId == this.serviceDetails.ServiceId).serviceName;
      this.serviceDetails.ServicePrice = this.servicesTimings.find(ser => ser.serviceId == this.serviceDetails.ServiceId).servicePrice;
      this.userServiceRequest.serviceDetails.push(this.serviceDetails);
    }


    // this.userDetails.TempleId = JSON.parse(this.templeId.toString());
    // this.serviceDetails.ServiceId = JSON.parse(this.serviceDetails.ServiceId.toString());
    // this.userDetails.TempleCity = this.templeDetails.cityName;
    // this.serviceDetails.ServiceName = this.servicesTimings.find(ser => ser.serviceId == this.serviceDetails.ServiceId).serviceName;
    // this.serviceDetails.ServicePrice = this.servicesTimings.find(ser => ser.serviceId == this.serviceDetails.ServiceId).servicePrice;
    // this.userDetails.RoomType = Number(this.userDetails.RoomTypeId) == 0 ? '' : (Number(this.userDetails.RoomTypeId) == 1 ? "AC" : "NonAC");
    // this.userDetails.DarshanType = Number(this.userDetails.DarshanTypeId) == 1 ? "Free" : "Paid";
    // this.userDetails.DarshanPrice = this.userDetails.DarshanTypeId == 1 ? 0 : 100;
    // this.userDetails.RoomPrice = this.userDetails.RoomType == 'AC' ? 200 : 0;


    // this.serviceRequest.TempleId = JSON.parse(this.templeId.toString());
    // this.serviceRequest.ServiceId = JSON.parse(this.serviceRequest.ServiceId.toString());
    // this.serviceRequest.TempleCity = this.templeDetails.cityName;
    // this.serviceRequest.ServiceName = this.servicesTimings.find(ser => ser.serviceId == this.serviceRequest.ServiceId).serviceName;
    // this.serviceRequest.ServicePrice = this.servicesTimings.find(ser => ser.serviceId == this.serviceRequest.ServiceId).servicePrice;
    // this.serviceRequest.RoomType = Number(this.serviceRequest.RoomTypeId) == 0 ? '' : (Number(this.serviceRequest.RoomTypeId) == 1 ? "AC" : "NonAC");
    // this.serviceRequest.DarshanType = Number(this.serviceRequest.DarshanTypeId) == 1 ? "Free" : "Paid";
    // this.serviceRequest.DarshanPrice = this.serviceRequest.DarshanTypeId == 1 ? 0 : 100;
    // this.serviceRequest.RoomPrice = this.serviceRequest.RoomType == 'AC' ? 200 : 0;
    console.log('save', this.userDetails);
    console.log('save1', this.serviceDetails);
    console.log('finalsave', this.userServiceRequest);

    sessionStorage.setItem("templeServiceDetails", JSON.stringify(this.userServiceRequest));

    this.router.navigate(['/templeserviceusercart']);

    // sessionStorage.getItem("templeServiceDetails") != null ||
    //   sessionStorage.getItem("templeServiceDetails") != undefined ?
    //   this.bookedService = JSON.parse(sessionStorage.getItem("templeServiceDetails")) : '';
    // this.bookedService.push(this.serviceRequest);
    // sessionStorage.setItem("templeServiceDetails", JSON.stringify(this.bookedService));

    // this.router.navigate(['/templeserviceusercart']);
  }

  // saveUserData(form: NgForm) {
  //   this.templeService.SaveUserServiceRequest(this.serviceRequest).subscribe((result) => {
  //     if (result) {
  //       if (result == "1") {
  //         this.showError('Service Request Registered Successfully.')
  //         form.resetForm();
  //         this.ngOnInit();
  //       }
  //       else {
  //         this.showError('Service Request Failed !, Please try after some time')
  //         console.log("DB Exception");
  //       }
  //     }
  //   },
  //     (error) => {
  //       this.showError('Service Request Failed !, Please try after some time')
  //       this.errorMessage = error;
  //     });
  // }

  showError(msg) {
    this.toastService.show(msg, {
      classname: 'bg-danger text-light',
      delay: 5000,
      autohide: true,
      headertext: 'Registration!'
    });
  }
}
