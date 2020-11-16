import { Component, OnInit} from '@angular/core';
import {ProductService} from './products.service';
import {Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { elementAt } from 'rxjs/internal/operators/elementAt';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  errorMessage:any;
  products:any;
  cityID:any;
  constructor(private productService:ProductService,private route: Router,
    private domSanitizer:DomSanitizer ) { }

  ngOnInit(): void {
    this.cityID=1;
    this.getProducts(this.cityID);
  }
  getProducts(cityid)
  {
    this.productService.getAllProducts(cityid).subscribe(
      (data) => {
          if (data) {
              this.products = data;
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
