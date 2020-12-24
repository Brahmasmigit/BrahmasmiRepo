import { Component, OnInit } from '@angular/core';
import {AdminBlogService} from '../adminblog/adminblog.service';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogDetails:any;errorMessage:any;
  constructor(private adminBlogService:AdminBlogService) { }

  ngOnInit(): void {
    this.getBlog();
  }
  getBlog()
  {
  
    this.adminBlogService.getBlog().subscribe(
      (data) => {
          if (data) {
              this.blogDetails = data;
          }
      },
      (error) => {
          this.errorMessage = error;
      },
      () => {
  
      }
  
  );
  }
}
