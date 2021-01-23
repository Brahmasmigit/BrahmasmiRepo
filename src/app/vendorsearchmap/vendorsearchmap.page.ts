import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ToastController,AlertController  } from '@ionic/angular'; 
import { LoadingController,NavController } from '@ionic/angular';  



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
  loaderToShow: any; 
  isMapError:boolean=false;
  public origin: any;
public destination: any;
  constructor(public platform: Platform,    private loadingCtrl: LoadingController,
    public toastCtrl: ToastController,private navCtrl: NavController,
    public alertController: AlertController) {
    this.height = platform.height() - 56;
  }
  ngOnInit() {
    this.origin = { lat: 17.398789, lng:  78.395734 };
    this.destination = { lat: 17.398754, lng: 78.396429 };
   
  }
  ngAfterContentInit()
  {
   //this.showLoader();
   // this.setCurrentLocation();
 
  }
 
  
  setCurrentLocation(){
 
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
     // this.hideLoader();
      //this.getAddress(this.latitude, this.longitude);
    },
    function error(msg) {
    // this.hideLoader();
      alert('Please enable your GPS position feature.');
      if(!this.isMapError)
      {
        this.isMapError=true;
        this. setCurrentLocation();
      }
    },
    {maximumAge:10000, timeout:5000, enableHighAccuracy: true});
 
  }
 }

  markerDragEnd($event) {
    console.log($event);
    this.latitude = $event.latLng.lat();
    this.longitude = $event.latLng.lng();
   // this.getAddress(this.latitude, this.longitude);
  }
  showLoader() {  
    this.loaderToShow = this.loadingCtrl.create({  
      message: 'Loading...'  
    }).then((res) => {  
      res.present();  
   
      res.onDidDismiss().then((dis) => {  
      });  
    });  
    //this.hideLoader();  
  }
  hideLoader() {  
    this.loadingCtrl.dismiss();   
  }   
  RefreshMap()
  {
    let interval:any;
let i=1;
interval =   setInterval(() => { 
      
        if(i==1)
        {
          this.origin= { lat: 17.398782, lng: 78.395816 };
        }
        if(i==2)
        {
          this.origin = { lat: 17.398781, lng: 78.395936};
        }
        if(i==3)
        {
          this.origin = { lat: 17.398775, lng: 78.396092 };
        }
        if(i==4)
        {
          this.origin = { lat: 17.398755, lng: 78.396387 };
        }
        if(i==4)
        {
          clearInterval(interval);
        }
      i++;
     }, 3000);

    }
   
    //this.showLoader();
   // this.setCurrentLocation();
  


}
