import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ToastController,AlertController  } from '@ionic/angular'; 
import { LoadingController,NavController } from '@ionic/angular';  
import {VendorSearchMapService} from './vendorsearchmap.service'
import { ActivatedRoute, Router } from '@angular/router';
import { MapsAPILoader,AgmMap  } from '@agm/core';
import { NgForm } from '@angular/forms';
import {UtilitiesService} from '../shared/services/utilities.service';
import { Observable, of, from } from 'rxjs';
import { filter, catchError, tap, map, switchMap } from 'rxjs/operators';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
//import { fromPromise } from 'rxjs/observable/fromPromise';
//import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {City, Language, Marker, Pandit, PanditModel, SelectedPanditForService, ServicePackageModel, VendorsDetails } from './vendorsearchmap.model'


@Component({
  selector: 'app-vendorsearchmap',
  templateUrl: './vendorsearchmap.page.html',
  styleUrls: ['./vendorsearchmap.page.scss'],
})
export class VendorsearchmapPage implements OnInit {

  language: Language[] = [] as Language[];
  panditModel: PanditModel = {} as PanditModel;
  finalVendorData: PanditModel = {} as PanditModel;
  serviceBookingList: PanditModel[] = [] as PanditModel[];
  servicePackageModel: ServicePackageModel = {} as ServicePackageModel;
  errorMessage: any;
  latitude: any;
  longitude: any;
  zoom: number;
  address: string;
  radius = 5000;
  radiusLat = 0;
  radiusLong = 0;
  PoojaServices: any=[];
  AstroCategories: any=[];
  showAstrology: boolean;
  showPooja: boolean;
  showPackage: any;
  private geoCoder:any;
  ServicePackages: any=[];
  continueClicked: boolean = true;
  VendorsList: VendorsDetails[] = [];
  vendors: any = [];
  isShown: any;
  markers: Marker[] = [];
  selectedDist: string = '';
  selectedPandit: SelectedPanditForService[] = [] as SelectedPanditForService[];
  previous_info_window: any;
  checkedValue = false;
  city: City[]=[];
  selectedCity: any;
  languageName:any;vendor:any;
  serviceId:any;cityID:any;serviceTypeId:any;  closeResult: string;
  selectedCategory:any;
  selectedPackage:any;
  @ViewChild('virtualSlotBookingForm') myForm: NgForm;
  @ViewChild('mymodal') mymodal: ElementRef;

  constructor(
    private vendorSearchMapService:VendorSearchMapService,
    private utilitiesService: UtilitiesService,
    private router:Router,
    private loadingCtrl: LoadingController,
    public toastCtrl: ToastController,private navCtrl: NavController,
     private mapLoader: MapsAPILoader,private activatedRoute: ActivatedRoute,
   ) {
    this.previous_info_window = null;
  }

  ngOnInit(): void {
    this.selectedPandit = [];
 
    this.serviceTypeId= this.activatedRoute.snapshot.params['serviceTypeId'];
    this.serviceId= this.activatedRoute.snapshot.params['serviceId'];
    this.languageName= this.activatedRoute.snapshot.params['languageName'];
    this.cityID= this.activatedRoute.snapshot.params['cityId'];
    this.initGeocoder();
    this.getLanguages();
    this.setCurrentLocation();
    this.getVendorInfo();
    this.getCity();
    
  // if(this.serviceId!=null|| this.serviceId!="")
  // {
  //   console.log(this.serviceId)
  //   this.panditModel.CityId=this.cityID;
  //   console.log(  this.panditModel.CityId)
  //   this.panditModel.languageName=this.languageName;
  //   this.getCity();
  //   this.getLanguages();
  // }
    this.serviceBookingList = [];
    this.panditModel.isNewLocation = false;
    this.panditModel.currentLocationAddress = "";

    sessionStorage.clear();
  }

  private initGeocoder() {
    console.log('Init geocoder!');
    this.geoCoder = new google.maps.Geocoder();
  }

  openDetailsPopup(vendorID) {
    this.GetVendorProfile(vendorID);
    this.placeOrder(this.mymodal);


  }
  placeOrder(content) {
  /*  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "xlModalvendor" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });*/
  }
  private getDismissReason(reason: any): string {

   /* if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }*/
    return 'sdsd';
  }
  getLanguages() {
    this.utilitiesService.getlanguages().subscribe(
      (data) => {
        if (data) {
          this.language = data;
          if(this.languageName!=undefined)
          {
            this.panditModel.languageName=this.languageName;
            console.log(this.panditModel.languageName)

          }
        }
      },
      error => {
        console.log("languages");
        this.errorMessage = error;
      });
  }

  getCity() {
    //this.city = {} as City;
    this.utilitiesService.getAllCities().subscribe(
      (data) => {
        if (data)
          this.city = data;
      },
      (error) => {
        console.log("city");
        this.errorMessage = error;
      });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('pos', position);
        // this.latitude = parseFloat(position.coords.latitude.toFixed(7));
        // this.longitude =parseFloat( position.coords.longitude.toFixed(7));
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.radiusLat = this.latitude;
        this.radiusLong = this.longitude;
        console.log(this.latitude,this.longitude)
        this.zoom = 14;
        this.panditModel.isNewLocation =  true; //!this.panditModel.isNewLocation;
        this.panditModel.currentLocationAddress = this.panditModel.pujaLocation;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  getAddress(latitude, longitude) {
  
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 16;
          console.log('addr', results);
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

  geoCodeAddress(location: string) {
    console.log('Start geocoding!');
    return this.waitForMapsToLoad().pipe(
      // filter(loaded => loaded),
       this.geoCoder.geocode({'address': location}, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
              console.log('Geocoding complete!');
             
                this.latitude= results[0].geometry.location.lat();
                this.longitude= results[0].geometry.location.lng();
                this.radiusLat = this.latitude;
                this.radiusLong = this.longitude;
                this.address = results[0].formatted_address;
                this.panditModel.pujaLocation = this.address;

                //update pandit model with updated address for billing.
                //this.panditModel.isNewLocation = false;
                results[0].address_components.forEach(item => {
                  if (item.types.includes('locality')) {
                    this.panditModel.currentCityName = item.long_name;
                    this.panditModel.newCityName = item.long_name;
                  }
                  if (item.types.includes('postal_code')) {
                    this.panditModel.currentLocationPincode = item.long_name;
                    this.panditModel.newLocationPincode = item.long_name;
                  }
                });
                this.panditModel.currentLocationAddress = this.address;
                this.panditModel.newLocationAddress = this.address;
              }
            }));       
  }

  private waitForMapsToLoad(): Observable<boolean> {
    if(!this.geoCoder) {
      return from(this.mapLoader.load())
      .pipe(
        tap(() => this.initGeocoder()),
        map(() => true)
      );
    }
    return of(true);
  }

  markerDragEnd($event) {
    console.log($event);
    this.latitude = $event.latLng.lat();
    this.longitude = $event.latLng.lng();
    this.getAddress(this.latitude, this.longitude);
  }

  onAddressChanged()
  {
    console.log("Address changed fired.");
    this.geoCodeAddress(this.panditModel.pujaLocation);
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
    if(this.PoojaServices != undefined){
      console.log("Pooja Service count:" + this.PoojaServices.length);
    }

    if(this.PoojaServices == undefined || this.PoojaServices == null || this.PoojaServices.length == 0){
      console.log("Calling API for pooja services ...");
    this.utilitiesService.getPoojaServices().subscribe(
      (data) => {
        if (data) {
          this.PoojaServices = data;
        }
      },
      (error) => {
        this.errorMessage = error;
      },
      () => {}
    );
  }
}

  getAstrologyCategories() {
    this.utilitiesService.getAstrologyCategories().subscribe(
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
    this.vendorSearchMapService.getPackagePrice(servicePackageID).subscribe(
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
    this.vendorSearchMapService.getServicePackage(serviceID).subscribe(
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

    this.vendorSearchMapService.getAllVendors().subscribe(
      (data) => {
        if (data) {
          this.vendors = data;
          console.log('vendor', this.vendors);
          //this.showDefault();
        }
      },
      (error) => {
        console.log("vendorinfo");
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
        console.log(this.isShown)
        this.VendorsList.push(
          {
            vendorID: this.vendors[i].vendorID,
            vendor_FirstName: this.vendors[i].vendor_FirstName,
            vendor_MobileNumber: this.vendors[i].vendor_MobileNumber,
            vendor_Address1: this.vendors[i].vendor_Address1,
            photo: this.vendors[i].vendor_Photo,
            //specializationName: this.vendors[i].specializationName,
            //languages: this.vendors[i].languages
            vendor_Latitude:this.vendors[i].vendor_Latitude,
            vendor_Longitude:this.vendors[i].vendor_Longitude
          }
        )
      }
    }
    console.log("No. of Vendors matches -", this.VendorsList.length);
  }

  getDistanceBetween(lat1, lng1, lat2, lng2) {
    var from = new google.maps.LatLng(lat1, lng1);
    var to = new google.maps.LatLng(lat2, lng2);
    var distinmts = google.maps.geometry.spherical.computeDistanceBetween(from,to);	
    var distinkms = distinmts / 1000;	
    console.log('Distance in kms ', distinkms);
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

  GoToService() {
    let userInfo: any;
    // let item: Pandit = {} as Pandit;
    this.finalVendorData.VendorList = [];

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
    this.finalVendorData.languageName = this.languageName;
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
    //this.finalVendorData.itemName='';
    if (sessionStorage.getItem("userInfo") != null) {
      userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      this.finalVendorData.UserId = Number(userInfo.userId);
    }
    else {
      this.finalVendorData.UserId = 0;
    }

    this.selectedPandit.forEach(pandit => {
      let item: Pandit = {} as Pandit;
      item.VendorID = Number(pandit.vendorID)
      this.finalVendorData.VendorList.push(item);
    });


    console.log('book', this.finalVendorData);
    this.serviceBookingList.push(this.finalVendorData);

    sessionStorage.setItem("orderdetailsByMap", JSON.stringify(this.serviceBookingList));
    sessionStorage.setItem("cartType", "panditByMap");
   // this.router.navigate(['/usercart']);
   this.router.navigate(['/servicedetails',this.finalVendorData.serviceTypeId,this.finalVendorData.serviceId,this.finalVendorData.CityId,this.finalVendorData.languageName]);
  }
  selectlang(event) {
   console.log('lang', event.target.options[event.target.options.selectedIndex].text)
   this.languageName= event.target.options[event.target.options.selectedIndex].text;
  }
  async showError(msg) {  
    const toast = await this.toastCtrl.create({  
      message: msg,   
      position: 'middle',  
      duration: 2000,
      color:'danger'
    });  
    toast.present();  
    toast.onDidDismiss().then((val) => {  
      console.log('Toast Dismissed');  
    });  
  }
  GetVendorProfile(VendorID)
  {

    this.vendorSearchMapService.GetVendorProfile(VendorID).subscribe(
      (data) => {
          if (data) {
              this.vendor = data;
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
  
   Back()
   {
    this.router.navigate(['/home']);
   }
   

}
