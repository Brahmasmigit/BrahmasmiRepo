import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../gallery/gallery.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
   images:any[];
  filterBy?: string = 'events'
  visibleImages:any[] = [];

  constructor(private galleryService: GalleryService) { 
    console.log(this.filterBy)
    this.visibleImages = this.galleryService.getImages();
  }

  ngOnInit(): void {
  }

}
