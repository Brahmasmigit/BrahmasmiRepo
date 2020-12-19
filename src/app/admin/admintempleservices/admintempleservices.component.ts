import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import 'quill-emoji/dist/quill-emoji.js';
import { TempleServiceAdmin, ServicesTimings, State, City, Temple, TempleType, TempleTypeData } from '../admintempleservices/templeservice.model'
import { TempleAdminService } from './templeAdminService.services';
import { ToastService } from 'src/app/shared/services/toastservice';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { DomSanitizer } from '@angular/platform-browser';

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
  UploadedFile: File;
  imageURL: any;
  formData: FormData = {} as FormData;
  @ViewChild('inputFile') inputFileName: ElementRef;

  constructor(private templeService: TempleAdminService, private toastService: ToastService, private utilitiesService: UtilitiesService, private domSanitizer: DomSanitizer) {
    this.addModules();
  }

  ngOnInit(): void {
    this.btntext = "Save";
    this.imageURL = null;
    this.getState();
    this.serviceTimings = [];
    this.newService = { serviceId: 0, serviceName: "", serviceTimings: "", servicePrice: 0, templeId: 0 };
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

  upload(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.UploadedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  AddTemple(form: NgForm) {

    console.log('model', this.templeModel);
    if (!form.valid)
      return;
    this.formData = new FormData();
    this.formData.append('Action', this.btntext == 'Save' ? 'Insert' : 'Update');
    this.formData.append('TempleTypeId', JSON.parse(this.templeModel.TempleTypeId.toString()));
    this.formData.append('TempleId', (this.templeModel.TempleId == null || this.templeModel.TempleId == undefined) ? '0' : this.templeModel.TempleId.toString());
    this.formData.append('TempleName', this.templeModel.TempleName);
    this.formData.append('TempleDescription', this.templeModel.TempleDescription);
    this.formData.append('ServicesTimings', JSON.stringify(this.serviceTimings));
    this.formData.append('StateId', JSON.parse(this.templeModel.StateId.toString()));
    this.formData.append('CityId', JSON.parse(this.templeModel.CityId.toString()));
    this.formData.append('TempleImage', this.UploadedFile);
    this.formData.append('CustomerReviews', this.templeModel.CustomerReviews);

    this.SaveTemple(this.formData, form);
  }

  SaveTemple(formData: FormData, form: NgForm) {

    this.templeService.SaveTemple(formData).subscribe((data) => {
      if (data) {
        if (data == "1") {
          this.templeAdminData.Action == 'Insert' ? this.showError('Temple Inserted Successfully.') : this.showError('Temple Updated Successfully.');
          form.resetForm();
          this.inputFileName.nativeElement.value = '';
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
    this.newService = { serviceId: 0, serviceName: "", serviceTimings: "", servicePrice: 0, templeId: tId };
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
        let str = d.serviceName + ' - ' + d.serviceTimings + ' - ' + 'Rs.' + d.servicePrice.toString();
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
    var ArrayBuffer = data.templeImage;
    this.imageURL = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + ArrayBuffer);

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
    this.templeModel.TempleImageFileName = data.templeImageFileName;
    this.serviceTimings = this.servicesTimings.filter(service => service.templeId == data.templeId);
  }

  onDelete(data: Temple) {
    if (confirm('Are you sure you want to delete?')) {
      var deleteData: TempleServiceAdmin = {} as TempleServiceAdmin;
      this.formData = new FormData();
      deleteData.TempleId = data.templeId;

      this.templeService.DeleteTemple(deleteData).subscribe((data) => {
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