import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import 'quill-emoji/dist/quill-emoji.js';
import { TempleServiceAdmin, ServicesTimings, State, City, Temple, TempleType, TempleTypeData } from '../admintempleservices/templeservice.model'
import { TempleService } from './templeService.services';
import { ToastService } from 'src/app/shared/services/toastservice';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';

@Component({
  selector: 'app-admintempleservices',
  templateUrl: './admintempleservices.component.html',
  styleUrls: ['./admintempleservices.component.css']
})
export class AdmintempleservicesComponent implements OnInit {
  errorMessage: any;
  templeModel: TempleServiceAdmin = {} as TempleServiceAdmin;
  modules = {};
  Cities: City;
  States: State;
  serviceTimings: ServicesTimings[] = [];
  newService: ServicesTimings = {} as ServicesTimings;
  templeAdminData: TempleServiceAdmin = {} as TempleServiceAdmin;
  templeDetails: Temple[] = [];
  servicesTimings: ServicesTimings[] = [];
  data: ServicesTimings[] = [];
  isEdit: boolean = false;
  btntext: string;
  templeType: TempleType[] = [];

  constructor(private templeService: TempleService, private toastService: ToastService, private utilitiesService: UtilitiesService) {
    this.addModules();
  }

  ngOnInit(): void {
    this.btntext = "Save";
    this.getState();
    this.serviceTimings = [];
    this.newService = { serviceId: 0, serviceName: "", serviceTimings: "", templeId: 0 };
    this.serviceTimings.push(this.newService);
    this.getAllTemples();
    this.getTempleType();
  }

  getTempleType() {
    this.templeService.GetTempleTypes().subscribe((result) => {
      if (result) {
        if (result.length > 0) {
          this.templeType = result;
        }
      }
    },
      error => {
        this.errorMessage = error;
      })
  }

  getState() {
    this.utilitiesService.getStates().subscribe((data) => {
      if (data)
        this.States = data;
    },
      (error) => {
        this.errorMessage = error;
      });
  }

  getCity(StateID: number) {
    this.Cities = {} as City;
    this.utilitiesService.getCities(StateID).subscribe(
      (data) => {
        if (data)
          this.Cities = data;
      },
      (error) => {
        this.errorMessage = error;
      });
  }

  onStateChange() {
    this.getCity(this.templeModel.StateId);
  }

  AddTemple(form: NgForm) {
    if (!form.valid)
      return;

    this.templeAdminData.Action = this.btntext == 'Save' ? 'Insert' : 'Update';
    this.templeAdminData.TempleTypeId = JSON.parse(this.templeModel.TempleTypeId.toString())
    this.templeAdminData.TempleId = this.templeModel.TempleId;
    this.templeAdminData.TempleName = this.templeModel.TempleName;
    this.templeAdminData.TempleDescription = this.templeModel.TempleDescription;
    this.templeAdminData.ServicesTimings = this.serviceTimings;
    this.templeAdminData.StateId = JSON.parse(this.templeModel.StateId.toString());
    this.templeAdminData.CityId = JSON.parse(this.templeModel.CityId.toString());
    this.templeAdminData.CustomerReviews = this.templeModel.CustomerReviews;

    this.templeService.SaveTemple(this.templeAdminData).subscribe((data) => {
      if (data) {
        if (data == "1") {
          this.templeAdminData.Action == 'Insert' ? this.showError('Temple Inserted Successfully.') : this.showError('Temple Updated Successfully.');
          form.resetForm();
          this.ngOnInit();
        }
        else {
          this.showError('Profile Update Failed !, Please try after some time')
          console.log("DB Exception");
        }
      }
    },
      (error) => {
        this.showError('Profile Update Failed !, Please try after some time')
        this.errorMessage = error;
      });
  }

  addService(index) {
    var tId = this.isEdit ? this.templeModel.TempleId : 0
    this.newService = { serviceId: 0, serviceName: "", serviceTimings: "", templeId: tId };
    this.serviceTimings.push(this.newService);
    return true;
  }

  deleteService(index) {
    if (this.serviceTimings.length == 1) {
      return false;
    } else {
      this.serviceTimings.splice(index, 1);
      return true;
    }
  }

  showError(msg) {
    this.toastService.show(msg, {
      classname: 'bg-danger text-light',
      delay: 5000,
      autohide: true,
      headertext: 'Registration!'
    });
  }

  getAllTemples() {
    let tmpData = 0;
    this.templeService.GetTemples(tmpData).subscribe((data) => {
      if (data) {
        this.templeDetails = data;
        this.getServiceTimings();
      }
    },
      (error) => {
        this.errorMessage = error;
      });
  }

  getServiceTimings() {
    let tmpData = 0;
    this.templeService.GetServicesTimings(tmpData).subscribe((data) => {
      if (data) {
        this.servicesTimings = data;
        this.addServicesTimingsToTemples();
      }
    },
      (error) => {
        this.errorMessage = error;
      });
  }

  addServicesTimingsToTemples() {
    this.templeDetails.forEach(temple => {
      let concatString;
      let servId;
      this.data = this.servicesTimings.filter(data => data.templeId == temple.templeId);
      this.data.forEach(d => {
        let str = d.serviceName + ' - ' + d.serviceTimings;
        servId = d.serviceId;
        if (concatString == null || concatString == undefined) {
          concatString = str;
        } else {
          concatString = concatString + '\r\n' + str;
        }
      })
      temple.servTimings = concatString;
      temple.serviceId = servId;
    })

  }

  onEdit(data: Temple) {
    this.getCity(0);
    this.btntext = "Update";
    this.isEdit = true;
    this.templeModel.TempleTypeId = data.templeTypeId;
    this.templeModel.TempleId = data.templeId
    this.templeModel.TempleName = data.templeName;
    this.templeModel.TempleDescription = data.templeDescription;
    this.templeModel.StateId = data.stateId;
    this.templeModel.CityId = data.cityId;
    this.templeModel.CustomerReviews = data.customerReviews;
    this.serviceTimings = this.servicesTimings.filter(service => service.templeId == data.templeId)
  }

  onDelete(data: Temple) {
    if (confirm('Are you sure you want to delete?')) {
      var deleteData: TempleServiceAdmin = {} as TempleServiceAdmin;
      deleteData.TempleId = data.templeId;
      deleteData.Action = 'Delete';
      this.templeService.SaveTemple(deleteData).subscribe((data) => {
        if (data) {
          if (data == "1") {
            this.showError('Temple Deleted Successfully.');
            this.ngOnInit();
          }
          else {
            this.showError('Temple Delete Failed !, Please try after some time')
            console.log("DB Exception");
          }
        }
      },
        (error) => {
          this.showError('Temple Delete Failed !, Please try after some time')
          this.errorMessage = error;
        });
    }
  }

  addModules() {
    this.modules = {
      'emoji-shortname': true,
      'emoji-textarea': true,
      'emoji-toolbar': true,
      'toolbar': [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean'],                                         // remove formatting button

        ['link', 'image', 'video'],                         // link and image, video
        ['emoji']

      ]
    }
  }
}