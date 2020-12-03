import { Component, OnInit} from '@angular/core';
import {ProductCategoriesService} from './productcategories.service';
import {Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-productcategories',
  templateUrl: './productcategories.component.html',
  styleUrls: ['./productcategories.component.css']
})
export class ProductcategoriesComponent implements OnInit {
  errorMessage:any;
  productcategories:any;
  paramsModel:any={};
  constructor(private productCategoriesService:ProductCategoriesService) { }

  ngOnInit(): void {
    this.getProductCategories();
  }
  getProductCategories()
  {
    this.productCategoriesService.getProductCategories().subscribe(
      (data) => {
          if (data) {
              this.productcategories = data;
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
