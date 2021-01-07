import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../shared/services/toastservice'

@Component({
  selector: 'app-usercart',
  templateUrl: './usercart.component.html',
  styleUrls: ['./usercart.component.css']
})
export class UsercartComponent implements OnInit {

  cartitems: any = [];
  subtotal: number = 0;
  discount: any = 0;
  total: number = 0;
  serviceId: any;
  serviceTypeId: any;
  cartType: any;
  productitems: any = []; poojakitname: boolean = false;
  cartTypeByMap: boolean = false;
  constructor(private toastService: ToastService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.serviceId = params.serviceId;
      this.serviceTypeId = params.serviceTypeId;

    });
    this.loadCart();
  }
  loadCart() {
    if (sessionStorage.getItem("cartType") != null) {
      this.cartType = sessionStorage.getItem("cartType");
      if (sessionStorage.getItem("cartType") == "ecart") {
        if (sessionStorage.getItem("productdetails") != null) {
          this.productitems = JSON.parse(sessionStorage.getItem("productdetails"));
          this.productitems.forEach((element, i) => {
            this.productitems[i].ProductPrice = element.ProductPrice;
            this.productitems[i].Quantity = element.Quantity;
            this.productitems[i].ProductCost = Number(this.productitems[i].ProductPrice) * Number(this.productitems[i].Quantity);
            this.subtotal += this.productitems[i].ProductCost;
            this.productitems[i].Total = this.subtotal
          });
          this.total = this.subtotal;
        }
        else {
          this.subtotal = 0;
          this.total = 0;
        }
      }

      else if (sessionStorage.getItem("cartType") == "service" || sessionStorage.getItem("cartType") == "astrology" || sessionStorage.getItem("cartType") == "virtual"
        || sessionStorage.getItem("cartType") == "pandit") {
        if (sessionStorage.getItem("orderdetails") != null) {
          this.cartitems = JSON.parse(sessionStorage.getItem("orderdetails"));
          console.log(this.cartitems[0].itemName)
          if (this.cartitems[0].itemName != null) {
            this.poojakitname = true;

          }
          else {
            this.poojakitname = false;
          }
          this.cartitems.forEach(element => {
            this.subtotal += element.Total;
          });
          this.total = this.subtotal;
        }
        else {
          this.subtotal = 0;
          this.total = 0;
        }
      }
      else if (sessionStorage.getItem("cartType") == "panditByMap") {
        if (sessionStorage.getItem("orderdetailsByMap") != null) {
          this.cartitems = JSON.parse(sessionStorage.getItem("orderdetailsByMap"));
          this.cartTypeByMap = true;
          this.cartitems.forEach(element => {
            this.subtotal += element.Total;
          });
          this.total = this.subtotal;
        } else {
          this.subtotal = 0;
          this.total = 0;
        }
      }
    }

  }
  QuantityChange(val, item, i) {

    if (val != undefined || val != "") {
      if (val == "0") {
        val = 1;
        item.Quantity = Number(val);
      }
      this.subtotal = 0;
      this.total = 0;
      item.Quantity = Number(val);
      item.ProductCost = Number(item.ProductPrice) * Number(item.Quantity);
      // this.subtotal +=  item.ProductCost;
      // this.total=this.subtotal;
      item.Total = item.ProductCost;
      this.productitems[i] = item;
      if (this.productitems.length > 0) {
        this.productitems.forEach((element, i) => {

          this.subtotal += this.productitems[i].ProductCost;
          this.total = this.subtotal;
        });
      }
    }
  }
  Delete(serviceid, i) {
    this.subtotal = 0;
    this.total = 0;

    if (sessionStorage.getItem("cartType") == "ecart") {
      this.productitems.splice(i, 1);
      sessionStorage.setItem("productdetails", JSON.stringify(this.productitems));
    }
    else {
      this.cartitems.splice(i, 1);
      console.log(this.cartitems)
      sessionStorage.setItem("orderdetails", JSON.stringify(this.cartitems));
    }
    this.loadCart();
  }
  BookAnotherService() {
    if (sessionStorage.getItem("cartType") == "ecart") {
      sessionStorage.setItem("productdetails", JSON.stringify(this.productitems));
      this.router.navigate(['/products']);
    }
    else if (sessionStorage.getItem("cartType") == "service") {
      this.router.navigate(['/home']);
    }
    else if (sessionStorage.getItem("cartType") == "astrology") {
      this.router.navigate(['/astrologyslotbooking']);
    }
    else if (sessionStorage.getItem("cartType") == "virtual") {
      this.router.navigate(['/virtualslotbooking']);
    }
    else if (sessionStorage.getItem("cartType") == "pandit") {
      this.router.navigate(['/vendorsearch']);
    }
  }
  CheckOut() {
    if (sessionStorage.getItem("cartType") == "ecart") {
      sessionStorage.setItem("productdetails", JSON.stringify(this.productitems));
    }
    this.router.navigate(['/userbilling']);
  }

}
