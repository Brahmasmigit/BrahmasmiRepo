import { Component, OnInit, NgZone,Output,EventEmitter    } from '@angular/core';
import {VendorLocationService} from '../vendorlocation/vendorlocation.service';
import { Binary } from 'selenium-webdriver/firefox';
import { ActivatedRoute, Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core';

interface marker {
	vendor_Latitude: number;
	vendor_Longitude: number;
	label?: string;
  draggable: boolean;
  content?:string;
  isShown:boolean;
  icon:string;
}
interface vendorsdetails {
  vendorID:string;
  vendor_FirstName:string;
  vendor_MobileNumber:string;
  vendor_Address1:string;
  photo:Binary;
  specializationName:string;
  languages:string;
}

@Component({
  selector: 'app-vendorlocation',
  templateUrl: './vendorlocation.component.html',
  styleUrls: ['./vendorlocation.component.css']
})


  export class VendorlocationComponent implements OnInit {
    title: string = 'AGM project';
    latitude: number;
    longitude: number;
    zoom: number;
    address: string;
    private geoCoder;

    // Radius
    radius =5000;
    radiusLat = 0;
    radiusLong = 0;
    markers: marker[] = []
    vendors:any= [];
    VendorsList:vendorsdetails[] =[];
    errorMessage:any;
    isShown:any;
    selectedDist: string = '';
    @Output()
    eventBook:EventEmitter<any> = new EventEmitter<any>();
  constructor(   private vendorLocationService:VendorLocationService,
    private mapsAPILoader: MapsAPILoader,
    private router:Router,
    private ngZone: NgZone) { }

  ngOnInit(): void {

   // this.mapsAPILoader.load().then(() => {
      this.getVendorInfo();
      this.setCurrentLocation();


  //  });


  }

  showDefault()
  {
    this.radius=5000;
    this.zoom=11;
    this.VendorsList=[];
    this.showHideMarkers();
    return false;
  }
  changeKm(event: any) {
    this.selectedDist=event.target.value;
    console.log(this.selectedDist)
    if(this.selectedDist=='5Km')
    {
      this.radius=5000;
      this.zoom=11;
      this.VendorsList=[];
      this.showHideMarkers();
      return false;
    }

    if(this.selectedDist=='10Km')
    {
      this.radius=10000;
      this.zoom=11;
      this.VendorsList=[];
      this.showHideMarkers();
      return false;
    }

    if(this.selectedDist=='15Km')
    {
      this.radius=15000;
      this.zoom=10;
      this.VendorsList=[];
      this.showHideMarkers();
      return false;
    }

    if(this.selectedDist='More Than 15Km')
    {
      this.radius=500000;
      this.zoom=6;
      this.VendorsList=[];
      this.showHideMarkers();
      return false;
    }
    //this.radius = $event;
  }
  // changeKm(event)
  // {
  //   console.log(this.event)
  // }
  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.radiusLat = this.latitude;
        this.radiusLong = this.longitude;
          this.zoom = 14;
      });
    }
  }

  clickedMarker( index: number) {
    console.log(`clicked the marker: ${ index}`)
  }

  radiusDragEnd($event: any) {
    console.log($event);
    this.radiusLat = $event.coords.vendor_Latitude;
    this.radiusLong = $event.coords.vendor_Longitude;
    //this.showHideMarkers();
  }

  event(type,$event) {
    console.log(type,$event);
    this.radius = $event;
   // this.showHideMarkers();
  }

  showHideMarkers(){

   for(var i=0;i<this.vendors.length;i++)
   {

    this.isShown = this.getDistanceBetween(this.vendors[i].vendor_Latitude,this.vendors[i].vendor_Longitude,this.radiusLat,this.radiusLong);
    if(this.isShown==true)
    {
      this.VendorsList.push(
        {
          vendorID:this.vendors[i].vendorID,
          vendor_FirstName:this.vendors[i].vendor_FirstName,
          vendor_MobileNumber:this.vendors[i].vendor_MobileNumber,
          vendor_Address1:this.vendors[i].vendor_Address1,
          photo:this.vendors[i].photo,
          specializationName:this.vendors[i].specializationName,
          languages:this.vendors[i].languages
        }
       )

    }

   }



  }
  Book(vendorid)
  {
    sessionStorage.setItem("bookingvendorid",JSON.stringify(vendorid));
    this.router.navigate(['/vendorbooking']);
  }
  getDistanceBetween(lat1,lng1,lat2,lng2){

    var from = new google.maps.LatLng(lat1,lng1);
    var to = new google.maps.LatLng(lat2,lng2);
 if(google.maps.geometry.spherical.computeDistanceBetween(from,to) <= this.radius){
      console.log('Radius',this.radius);
      console.log('Distance Between',google.maps.geometry.spherical.computeDistanceBetween(
        from,to
      ));
      return true;
    }else{
      return false;
    }
  }
  getVendorInfo()
  {

    this.vendorLocationService.getAllVendors().subscribe(
      (data) => {
          if (data) {
              this.vendors = data;
              this.showDefault();

          }

      },
      (error) => {
          this.errorMessage = error;
      },
      () => {
        this.showHideMarkers();
      }

  );
}
onMouseOver(infoWindow, $event: MouseEvent) {
  infoWindow.open();
}

// onMouseOut(infoWindow, $event: MouseEvent) {
//   infoWindow.close();
// }
onClick(infoWindow, $event: MouseEvent) {
  infoWindow.open();
}

BookVendor(vendorid,vendorname,vendoraddress)
{

  var vendordetails:any={};
  vendordetails.vendorId=vendorid;
  vendordetails.vendorName=vendorname;
  vendordetails.vendorAddress=vendoraddress;
  this.eventBook.emit(vendordetails);
}

}
