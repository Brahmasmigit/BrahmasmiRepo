import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../gallery/gallery.service';

@Component({
  selector: 'app-pressrelease',
  templateUrl: './pressrelease.component.html',
  styleUrls: ['./pressrelease.component.css']
})
export class PressreleaseComponent implements OnInit {
   images:any[];
  filterBy?: string = 'pressrelease'
  visibleImages:any[] = [];

  constructor(private galleryService: GalleryService) { 
    console.log(this.filterBy)
    this.visibleImages = this.galleryService.getImages();
  }

  ngOnInit(): void {
  }

}
