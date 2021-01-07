import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-aboutbrahmasmi',
  templateUrl: './aboutbrahmasmi.component.html',
  styleUrls: ['./aboutbrahmasmi.component.css']
})
export class AboutbrahmasmiComponent implements OnInit {
  images: any[];
  visibleImages: any[] = []; devImages = []; salesImages = [];hrImages = [];
  administratorImages = []; itImages = [];accountantImages = [];

  constructor() {
  //   console.log()
  //   this.visibleImages = this.aboutbrahmasmiService.getImages();
   }

  // ngOnChanges() {
  //   this.visibleImages = this.aboutbrahmasmiService.getImages();
  // }
  ngOnInit(): void {
    this.devImages = [
      { "id": 1, "url": "assets/Web-Images/radhika.png" },
      { "id": 2, "url": "assets/Web-Images/venkatesh.png" },
      // { "id": 3, "url": "assets/Web-Images/mahesh.png" },
      { "id": 4, "url": "assets/Web-Images/srikar.png" },
      { "id": 5, "url": "assets/Web-Images/aditi.png" },
      { "id": 6, "url": "assets/Web-Images/srilekha.png" },
    ]
    this.salesImages = [
      { "id": 1, "url": "assets/Web-Images/nithya.png" },
      { "id": 2, "url": "assets/Web-Images/sai.p.png" },
      { "id": 3, "url": "assets/Web-Images/pravallika.png" },
      { "id": 4, "url": "assets/Web-Images/swetha.png" },
      { "id": 5, "url": "assets/Web-Images/harsitha.png" },
      { "id": 6, "url": "assets/Web-Images/mourya.png" },
      { "id": 7, "url": "assets/Web-Images/Reshma.png" },
      { "id": 8, "url": "assets/Web-Images/tirupathi.png" },
      { "id": 9, "url": "assets/Web-Images/santhosh.png" },
      { "id": 10, "url": "assets/Web-Images/surya.png" },
    ]
    this.hrImages = [
      { "id": 1, "url": "assets/Web-Images/kavitha.png" },
    ]
    this.administratorImages = [
      { "id": 1, "url": "assets/Web-Images/rana.png" },

    ]
    this.itImages = [
      { "id": 1, "url": "assets/Web-Images/rajesh-it.png" },

    ]
    this.accountantImages = [
      { "id": 1, "url": "assets/Web-Images/amar.png" },

    ]
  }

}
