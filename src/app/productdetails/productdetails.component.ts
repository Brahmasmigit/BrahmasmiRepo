import { Component, OnInit} from '@angular/core';
import {ProductDetailsService} from './productdetails.service';
import {Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { elementAt } from 'rxjs/internal/operators/elementAt';
import {ToastService} from '../shared/services/toastservice';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  errorMessage:any;
  productDetails:any={};
  product:any;
  productCategoryID:any;
  productID:any;
  paramsModel:any={};
  productKeyInsights:any;
  ShowKeyInsights:boolean=false;
  ShowItems:boolean=false;

  constructor(private productDetailsService:ProductDetailsService,private route: Router,private toastService:ToastService,
    private domSanitizer:DomSanitizer ,private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.productID= this.activatedRoute.snapshot.params['productID'];
    this.productCategoryID=Number(sessionStorage.getItem("productCategoryID"));
 
    console.log("categoryID")
    console.log(this.productCategoryID)
    this.paramsModel.productID=Number(this.productID);
    this.paramsModel.productCategoryID=Number(this.productCategoryID);
    if( this.paramsModel.productCategoryID==3)
    {
      this.getProductDetails( this.productID);
      this.ShowKeyInsights=false;
      this.ShowItems=true;
    }
    else{
      this.getKeyInsights( this.productID);
      this.ShowKeyInsights=true;
      this.ShowItems=false;
    }
  
    this.getProduct( this.productID);
  }
  getProduct(productID)
  {
    this.productDetailsService.getProduct(productID).subscribe(
      (data) => {
          if (data) {
              this.product = data;
              console.log(data)
          }

      },
      (error) => {
          this.errorMessage = error;
      },
      () => {

      });
  }

  getKeyInsights(productID)
  {
    this.productDetailsService.getProductKeyInsights(productID).subscribe(
      (data) => {
          if (data) {
              this.productKeyInsights = data;
              console.log(data)
          }

      },
      (error) => {
          this.errorMessage = error;
      },
      () => {

      });
  }
  getProductDetails(productid)
  {
    this.productDetailsService.getProductDetails(productid).subscribe(
      (data) => {
          if (data) {
              this.productDetails = data;
              console.log(data)
          }

      },
      (error) => {
          this.errorMessage = error;
      },
      () => {

      });
  }
  Continue()
  {
    sessionStorage.setItem("cartType","ecart");
    let products:any={};
    let productdetails:any=[];
    products.ProductId=Number(this.productID);
    products.ProductName= this.product.productName;
    products.ProductPrice=this.product.productPrice;
    products.Quantity=1;
    productdetails.push(products);
    if(sessionStorage.getItem("productdetails")!=null)
    {
        var arrorder=JSON.parse(sessionStorage.getItem("productdetails"));
        var data=arrorder.find(x=> x.ProductId==this.productID);
        if(data==null)
        {
        arrorder.push(products);
        sessionStorage.setItem("productdetails",JSON.stringify(arrorder));
        }
        else
        {
          this.showError("Product already added to Cart.");
          return;
        }

    }
    else
        {
            sessionStorage.setItem("productdetails",JSON.stringify(productdetails));
        }
    this.route.navigate(['/usercart']);
  }
  showError(msg) {
    this.toastService.show(msg, {
      classname: 'bg-danger text-light',
      delay: 4000 ,
      autohide: true,
      headertext: 'Error!'
    });
  }
}
