import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-getaddressfromlatlng',
  templateUrl: './getaddressfromlatlng.component.html',
  styleUrls: ['./getaddressfromlatlng.component.css']
})
export class GetaddressfromlatlngComponent implements OnInit {
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;
  constructor(  private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.latitude=17.544877;
    this.longitude=78.490591;
  this.mapsAPILoader.load().then(() => {
 
    this.geoCoder = new google.maps.Geocoder;
    this.getAddress(this.latitude, this.longitude);
    this.address="7-35, Devender Colony, Kompally, Hyderabad, Telangana 500014, India";
    this.getLatLng(this.address);
  });
  }
  getAddress(latitude, longitude) {
    //alert('called')
    var geoCoder
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          console.log(this.address);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  getLatLng(address)
  {
    var geoCoder
    this.geoCoder.geocode({ 'address': { formatted_address: address } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.latitude = results[0].latitude;
          console.log(this.latitude);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
}
