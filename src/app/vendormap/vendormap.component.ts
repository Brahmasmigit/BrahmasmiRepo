import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendormap',
  templateUrl: './vendormap.component.html',
  styleUrls: ['./vendormap.component.css']
})
export class VendormapComponent implements OnInit {
  title = 'My first AGM project';
  lat:number;
  lng:number;
  zoom: number;
  constructor() { }

  ngOnInit(): void {
    //this.setCurrentLocation();
this. directions();
    //this.setCurrentLocation();
  }
  Loadmap()
  {
    let lat =this.lat;
    let lng =this.lng;
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: { lat: lat, lng: lng },
        zoom: 8,
        mapTypeId: "terrain",
      }
    );

    // Define the symbol, using one of the predefined paths ('CIRCLE')
    // supplied by the Google Maps JavaScript API.
    const lineSymbol = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 8,
      strokeColor: "#393",
    };

    // Create the polyline and add the symbol to it via the 'icons' property.
    const line = new google.maps.Polyline({
      path: [
        { lat: lat, lng: lng },
        { lat: 18.291, lng: 153.027 },
      ],
      icons: [
        {
          icon: lineSymbol,
          offset: "100%",
        },
      ],
      map: map,
    });

    this.animateCircle(line);
  }
   animateCircle(line: google.maps.Polyline) {
    let count = 0;
    window.setInterval(() => {
      count = (count + 1) % 200;

      const icons = line.get("icons");
      icons[0].offset = count / 2 + "%";
      line.set("icons", icons);
    }, 20);
  }
   map:any;
  directions()
  {
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
     this.map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 14,
        center: { lat: 37.77, lng: -122.447 },
      }
    );
    directionsRenderer.setMap(this.map);

    this.calculateAndDisplayRoute(directionsService, directionsRenderer);
    (document.getElementById("mode") as HTMLInputElement).addEventListener(
      "change",
      () => {
        this.calculateAndDisplayRoute(directionsService, directionsRenderer);
      }
    );
  }
  calculateAndDisplayRoute(
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer
  ) {
    const selectedMode = (document.getElementById("mode") as HTMLInputElement)
      .value;
    directionsService.route(
      {
        origin: { lat: 37.77, lng: -122.447 }, // Haight.
        destination: { lat: 37.768, lng: -122.511 }, // Ocean Beach.
        // Note that Javascript allows us to access the constant
        // using square brackets and a string value as its
        // "property."
        // @ts-ignore
        travelMode: google.maps.TravelMode[selectedMode],
      },
      (response, status) => {
        if (status == "OK") {
          directionsRenderer.setDirections(response);
          const lineSymbol = {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            strokeColor: "#393",
          };
          const line = new google.maps.Polyline({
            path: [
              { lat: 37.77, lng: -122.447 },
              { lat: 37.768, lng: -122.511 },
            ],
            icons: [
              {
                icon: lineSymbol,
                offset: "100%",
              },
            ],
            map: this.map,
          });
          this.animateCircle(line);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

          this.zoom = 16;
          this.Loadmap();
      });
    }
  }

}
