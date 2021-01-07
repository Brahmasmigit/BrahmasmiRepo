import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminServiceDetailsService } from '../adminservicedetails/adminservicedetails.service';
import { AstrologySlotBookingService } from '../astrologyslotbooking/astrologyslotbooking.service';
import { ToastService } from '../shared/services/toastservice';
import { UtilitiesService } from '../shared/services/utilities.service';
import { VendorBookingService } from '../vendorbooking/vendorbooking.service';
import { VendorLocationService } from '../vendorlocation/vendorlocation.service';
import { City, Language, Marker, PanditModel, SelectedPanditForService, ServicePackageModel, VendorsDetails } from './vendorsearchmap.model';

@Component({
  selector: 'app-vendorsearchmap',
  templateUrl: './vendorsearchmap.component.html',
  styleUrls: ['./vendorsearchmap.component.css']
})
export class VendorSearchMapComponent implements OnInit {

  language: Language[] = {} as Language[];
  panditModel: PanditModel = {} as PanditModel;
  finalVendorData: PanditModel = {} as PanditModel;
  serviceBookingList: PanditModel[] = {} as PanditModel[];
  servicePackageModel: ServicePackageModel = {} as ServicePackageModel;
  errorMessage: any;
  latitude: any;
  longitude: any;
  zoom: number;
  address: string;
  radius = 5000;
  radiusLat = 0;
  radiusLong = 0;
  PoojaServices: any;
  AstroCategories: any;
  showAstrology: boolean;
  showPooja: boolean;
  showPackage: any;
  private geoCoder;
  ServicePackages: any;
  continueClicked: boolean = true;
  VendorsList: VendorsDetails[] = [];
  vendors: any = [];
  isShown: any;
  markers: Marker[] = [];
  selectedDist: string = '';
  selectedPandit: SelectedPanditForService[] = {} as SelectedPanditForService[];
  previous_info_window: any;
  checkedValue = false;
  city: City;
  selectedCity: any;
  @ViewChild('virtualSlotBookingForm') myForm: NgForm;

  constructor(private utilitiesService: UtilitiesService, private adminServiceDetailsService: AdminServiceDetailsService,
    private astrologySlotBookingService: AstrologySlotBookingService, private vendorBookingService: VendorBookingService,
    private vendorLocationService: VendorLocationService, private router: Router, private toastService: ToastService) {
    this.previous_info_window = null;
  }

  ngOnInit(): void {
    this.selectedPandit = [];
    this.getLanguages();
    this.setCurrentLocation();
    this.getVendorInfo();
    this.getCity();
    this.serviceBookingList = [];
    this.panditModel.isNewLocation = false;
    this.panditModel.currentLocationAddress = "";
    this.geoCoder = new google.maps.Geocoder;
    sessionStorage.clear();
  }

  getLanguages() {
    this.utilitiesService.getlanguages().subscribe(
      (data) => {
        if (data) {
          this.language = data;
        }
      },
      error => {
        this.errorMessage = error;
      });
  }

  getCity() {
    this.city = {} as City;
    this.utilitiesService.getAllCities().subscribe(
      (data) => {
        if (data)
          this.city = data;
      },
      (error) => {
        this.errorMessage = error;
      });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('pos', position);
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.radiusLat = this.latitude;
        this.radiusLong = this.longitude;
        this.zoom = 14;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 16;
          console.log('addr', results[0]);
          this.address = results[0].formatted_address;
          this.panditModel.pujaLocation = this.address;

          if (!this.panditModel.isNewLocation) {
            results[0].address_components.forEach(item => {
              if (item.types.includes('locality')) {
                this.panditModel.currentCityName = item.long_name;
              }
              if (item.types.includes('postal_code')) {
                this.panditModel.currentLocationPincode = item.long_name;
              }
            });
            this.panditModel.currentLocationAddress = this.address;
          } else {

            results[0].address_components.forEach(item => {
              if (item.types.includes('locality')) {
                this.panditModel.newCityName = item.long_name;
              }
              if (item.types.includes('postal_code')) {
                this.panditModel.newLocationPincode = item.long_name;
              }
            });
            this.panditModel.newLocationAddress = this.address;
          }

        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  markerDragEnd($event) {
    console.log($event);
    this.latitude = $event.latLng.lat();
    this.longitude = $event.latLng.lng();
    this.getAddress(this.latitude, this.longitude);
  }

  isPujaDifferentLocation() {
    this.panditModel.isNewLocation = !this.panditModel.isNewLocation;
    this.panditModel.currentLocationAddress = this.panditModel.pujaLocation;
    this.panditModel.pujaLocation = "";
  }

  onServiceTypeChange(servicetype) {
    if (servicetype == "Pooja Services") {
      this.getAllpoojaServices();
      this.showPooja = true;
      this.showAstrology = false;
    }
    else
      if (servicetype == "Astrology Services") {
        this.getAstrologyCategories();
        this.showAstrology = true;
        this.showPooja = false;
        this.showPackage = false;
      }
  }

  getAllpoojaServices() {
    this.adminServiceDetailsService.getService().subscribe(
      (data) => {
        if (data) {
          this.PoojaServices = data;
          console.log('puja', this.PoojaServices)
        }
      },
      (error) => {
        this.errorMessage = error;
      },
      () => {

      }

    );
  }

  getAstrologyCategories() {
    this.astrologySlotBookingService.getAstrologyCategories().subscribe(
      (data) => {
        if (data) {
          this.AstroCategories = data;
          console.log('astro', data);
        }
      },
      (error) => {
        this.errorMessage = error;
      },
      () => {
      }
    );
  }

  onPoojaChange(selectedCategory) {
    var serviceId = selectedCategory.serviceID;

    this.getPackages(serviceId);
    this.showPackage = true;
    this.servicePackageModel.serviceID = Number(serviceId);
    this.servicePackageModel.serviceName = selectedCategory.serviceName;
    this.servicePackageModel.serviceTypeId = 1;
    this.servicePackageModel.serviceTypeName = selectedCategory.serviceTypeName;
  }

  onAstrologyChange(selectedCategory) {
    this.panditModel.astroId = selectedCategory.astrologyID;
    this.panditModel.Total = selectedCategory.amount;
    this.servicePackageModel.serviceID = selectedCategory.astrologyID;
    this.servicePackageModel.serviceName = selectedCategory.astrologyName;
    this.servicePackageModel.serviceTypeId = 1;
  }

  onPackageChange(selectedPackage) {
    this.servicePackageModel.packageID = Number(selectedPackage.packageId);
    this.servicePackageModel.packageName = selectedPackage.packageName;
    this.getPackageAmount(this.servicePackageModel);
  }

  getPackageAmount(servicePackageID) {
    this.vendorBookingService.getPackagePrice(servicePackageID).subscribe(
      (data) => {
        if (data) {
          console.log("Package Amount :")
          console.log(data)
          this.panditModel.Total = data.price;
        }
      },
      (error) => {
        this.errorMessage = error;
      });
  }

  getPackages(serviceID) {
    this.vendorBookingService.getServicePackage(serviceID).subscribe(
      (data) => {
        if (data) {
          this.ServicePackages = data;
          console.log('pack', this.ServicePackages);
        }
      },
      (error) => {
        this.errorMessage = error;
      },
      () => {
      }
    );
  }

  BookPanditUsingMap() {
    if (this.checkedValue == false) {
      this.showError('Please Accept Terms & Conditions')
      return;
    }
    this.continueClicked = !this.continueClicked;
  }

  //---------------------------------------------------------------------------------------------------

  getVendorInfo() {

    this.vendorLocationService.getAllVendors().subscribe(
      (data) => {
        if (data) {
          this.vendors = data;
          this.vendors.push({ vendorID: 940, vendor_Address1: 'ecil', vendor_FirstName: 'chari', vendor_MobileNumber: '4353453454', vendor_Latitude: '17.47047259687567', vendor_Longitude: '78.56627678706359' });
          this.vendors.push({ vendorID: 945, vendor_Address1: 'sharada', vendor_FirstName: 'gowtham', vendor_MobileNumber: '6786545345', vendor_Latitude: '17.482721896434963', vendor_Longitude: '78.5507171958008' });
          console.log('vendor', this.vendors);
          // this.showDefault();
        }
      },
      (error) => {
        this.errorMessage = error;
      },
      // () => {
      //   this.showHideMarkers();
      // }

    );
  }

  showDefault() {
    this.radius = 5000;
    this.zoom = 11;
    this.VendorsList = [];
    this.showHideMarkers();
    return false;
  }

  showHideMarkers() {
    console.log('showhide called')
    for (var i = 0; i < this.vendors.length; i++) {
      this.isShown = this.getDistanceBetween(this.vendors[i].vendor_Latitude, this.vendors[i].vendor_Longitude, this.radiusLat, this.radiusLong);
      if (this.isShown == true) {
        this.VendorsList.push(
          {
            vendorID: this.vendors[i].vendorID,
            vendor_FirstName: this.vendors[i].vendor_FirstName,
            vendor_MobileNumber: this.vendors[i].vendor_MobileNumber,
            vendor_Address1: this.vendors[i].vendor_Address1,
            photo: this.vendors[i].photo,
            specializationName: this.vendors[i].specializationName,
            languages: this.vendors[i].languages
          }
        )
      }
    }
  }

  getDistanceBetween(lat1, lng1, lat2, lng2) {
    var from = new google.maps.LatLng(lat1, lng1);
    var to = new google.maps.LatLng(lat2, lng2);
    if (google.maps.geometry.spherical.computeDistanceBetween(from, to) <= this.radius) {
      console.log('Radius', this.radius);
      console.log('Distance Between', google.maps.geometry.spherical.computeDistanceBetween(
        from, to
      ));
      return true;
    } else {
      return false;
    }
  }

  changeKm(event: any) {
    this.selectedDist = (typeof event == "string") ? event : event.target.value;
    console.log(this.selectedDist)
    if (this.selectedDist == '5Km') {
      this.radius = 5000;
      this.zoom = 11;
      this.VendorsList = [];
      this.showHideMarkers();
      return false;
    }

    if (this.selectedDist == '10Km') {
      this.radius = 10000;
      this.zoom = 11;
      this.VendorsList = [];
      this.showHideMarkers();
      return false;
    }

    if (this.selectedDist == '15Km') {
      this.radius = 15000;
      this.zoom = 10;
      this.VendorsList = [];
      this.showHideMarkers();
      return false;
    }

    if (this.selectedDist = 'More Than 15Km') {
      this.radius = 500000;
      this.zoom = 6;
      this.VendorsList = [];
      this.showHideMarkers();
      return false;
    }
    //this.radius = $event;
  }

  onMouseOver(infoWindow, $event: MouseEvent) {
    if (this.previous_info_window == null) {
      infoWindow.open();
    } else {
      this.previous_info_window.close();
      infoWindow.open();
    }
    this.previous_info_window = infoWindow;
  }

  BookPandit(vendor: any, infoWindow) {
    if (this.selectedPandit.length == 3) {
      alert("max 3 pandits can be selected");
      infoWindow.close();
      return;
    }

    if (this.selectedPandit.some(sp => sp.vendorID == vendor.vendorID && sp.vendor_MobileNumber == vendor.vendor_MobileNumber)) {
      alert("Pandit Already Selected");
      infoWindow.close();
      return;
    }

    this.selectedPandit.push(vendor);
    infoWindow.close();
  }

  RemoveSelectedPandit(pandit: any) {
    this.selectedPandit.splice(this.selectedPandit.findIndex(sp => sp.vendorID == pandit.vendorID), 1);
  }

  onCheckboxChange(evnt) {
    this.checkedValue = evnt.target.checked;
  }

  GoToCart() {
    let userInfo: any;
    if (this.selectedPandit.length == 0 || this.selectedPandit.length >= 4) {
      this.showError('Please select less or equal to 3 pandits.')
      return;
    }
    this.finalVendorData.Total = this.panditModel.Total;
    this.finalVendorData.astroId = this.panditModel.astroId;
    this.finalVendorData.BookingDate = this.panditModel.BookingDate;
    this.finalVendorData.BookingTime = this.panditModel.BookingTime;
    this.finalVendorData.currentCityName = this.panditModel.currentCityName;
    this.finalVendorData.currentLocationAddress = this.panditModel.currentLocationAddress;
    this.finalVendorData.currentLocationPincode = this.panditModel.currentLocationPincode;

    this.finalVendorData.description = this.panditModel.description;
    this.finalVendorData.pujaLocation = this.panditModel.pujaLocation;
    this.finalVendorData.languageId = Number(this.panditModel.languageId);

    this.finalVendorData.packageId = this.servicePackageModel.packageID;
    this.finalVendorData.packageName = this.servicePackageModel.packageName;
    this.finalVendorData.serviceId = this.servicePackageModel.serviceID;
    this.finalVendorData.ServiceName = this.servicePackageModel.serviceName;
    this.finalVendorData.serviceTypeId = this.servicePackageModel.serviceTypeId;
    this.finalVendorData.CityId = this.selectedCity.cityID;
    this.finalVendorData.CityName = this.selectedCity.cityName;
    this.finalVendorData.description = this.panditModel.description;

    if (this.panditModel.serviceType == "Pooja Services") {
      this.finalVendorData.serviceType = "Pooja";
    }
    else
      if (this.panditModel.serviceType == "Astrology Services") {
        this.finalVendorData.serviceType = "Astrology";
      }

    this.finalVendorData.isNewLocation = this.panditModel.isNewLocation;
    this.finalVendorData.newCityName = this.panditModel.newCityName;
    this.finalVendorData.newLocationAddress = this.panditModel.newLocationAddress;
    this.finalVendorData.newLocationPincode = this.panditModel.newLocationPincode;

    if (sessionStorage.getItem("userInfo") != null) {
      userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      this.finalVendorData.UserId = Number(userInfo.userId);
    }
    else {
      this.finalVendorData.UserId = 0;
    }

    this.finalVendorData.VendorList = this.selectedPandit.map(x => x.vendorID).join(', ');

    console.log('book', this.finalVendorData);
    this.serviceBookingList.push(this.finalVendorData);

    sessionStorage.setItem("orderdetailsByMap", JSON.stringify(this.serviceBookingList));
    sessionStorage.setItem("cartType", "panditByMap");
    this.router.navigate(['/usercart']);
  }

  showError(msg) {
    this.toastService.show(msg, {
      classname: 'bg-info text-light',
      delay: 4000,
      autohide: true,
      headertext: 'Service Bookig'
    });
  }

}
