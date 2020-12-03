import { Component, OnInit} from '@angular/core';
import {ProductService} from './products.service';
import {Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { elementAt } from 'rxjs/internal/operators/elementAt';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  errorMessage:any;
  products:any;
  cityID:any;
  productCategoryID:any;
  productModel:any={};
  constructor(private productService:ProductService,private route: Router,
    private domSanitizer:DomSanitizer ,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cityID=1;
    this.productCategoryID= this.activatedRoute.snapshot.params['productCategoryID'];
    sessionStorage.setItem("productCategoryID",this.productCategoryID);
    this.productModel.CityID=Number(this.cityID);
    this.productModel.productCategoryID=Number(this.productCategoryID);
    console.log(this.productModel)
    this.getProducts(  this.productModel);
  }
  getProducts(Model)
  {
    this.productService.getAllProducts(Model).subscribe(
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
