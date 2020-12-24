import { Component, OnInit } from '@angular/core';
import {AdminBlogService} from '../adminblog/adminblog.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-blogdetails',
  templateUrl: './blogdetails.component.html',
  styleUrls: ['./blogdetails.component.css']
})
export class BlogdetailsComponent implements OnInit {
  blogData:any;errorMessage:any;blogID:any;
  constructor(private adminBlogService:AdminBlogService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.blogID= this.activatedRoute.snapshot.params['blogID'];
    this.getBlog(this.blogID);
  }
  getBlog(blogID)
  {
  
    this.adminBlogService.getBlogDetails(blogID).subscribe(
      (data) => {
          if (data) {
              this.blogData = data;
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
