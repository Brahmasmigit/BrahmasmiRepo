import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

export interface Marker {
  vendor_Latitude: number;
  vendor_Longitude: number;
  label?: string;
  draggable: boolean;
  content?: string;
  isShown: boolean;
  icon: string;
}

@Component({
  selector: 'app-vendorsearchmap',
  templateUrl: './vendorsearchmap.page.html',
  styleUrls: ['./vendorsearchmap.page.scss'],
})
export class VendorsearchmapPage {

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

  vendors: any = [];
  isShown: any;
  markers: Marker[] = [];
  selectedDist: string = '';

  previous_info_window: any;
  checkedValue = false;

  selectedCity: any;
  languageName:any;
  serviceId:any;cityID:any;serviceTypeId:any;
  height = 0;
  constructor(public platform: Platform) {
    this.height = platform.height() - 56;
  }
  ngOnInit() {
    this.setCurrentLocation();
 
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
        var accuracy = position.coords.accuracy;
        console.log(this.latitude,this.longitude)
        this.zoom = 14;
        //this.getAddress(this.latitude, this.longitude);
      },
      function error(msg) {alert('Please enable your GPS position feature.');},
      {maximumAge:10000, timeout:5000, enableHighAccuracy: true});
    }

  }
  
 

  markerDragEnd($event) {
    console.log($event);
    this.latitude = $event.latLng.lat();
    this.longitude = $event.latLng.lng();
   // this.getAddress(this.latitude, this.longitude);
  }

}
