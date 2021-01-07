import { Component, OnChanges, OnInit } from '@angular/core';
import { GalleryService } from '../gallery/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})

export class GalleryComponent implements OnChanges {
  images:any[];
  filterBy?: string = 'all'
  visibleImages:any[] = [];

  constructor(private galleryService: GalleryService) {
    console.log(this.filterBy)
    this.visibleImages = this.galleryService.getImages();
  }

  ngOnChanges() {
    this.visibleImages = this.galleryService.getImages();
  }
  
}

