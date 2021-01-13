import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../shared/services/toastservice'
import { OrderDetailsService } from '../orderdetails/orderdetails.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {

  orderdetails: any = [];
  orders: any = [];
  errorMessage: any;
  invoiceno: any;
  ngZone: NgZone;
  isReload: boolean = false;
  cartType: any;
  isAdmin: boolean = false;
  userInfo: any = {};
  isUser: boolean = false;
  isVendor: boolean = false;
  isPoojaKit: boolean = false;
  constructor(private toastService: ToastService, private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderDetailsService: OrderDetailsService) {

  }

  ngOnInit(): void {

    if (sessionStorage.getItem("userInfo") != null) {
      this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      this.isAdmin = this.userInfo.userTypeId == "3" ? true : false;
      this.isUser = this.userInfo.userTypeId == "1" ? true : false;
      this.isVendor = this.userInfo.userTypeId == "2" ? true : false;
    }

    this.getOrderdetails();
  }
  getOrderdetails() {
    if (sessionStorage.getItem("orders") != null) {
      if (sessionStorage.getItem("cartType") != null) {
        this.cartType = sessionStorage.getItem("cartType");
      }
      this.orders = JSON.parse(sessionStorage.getItem("orders"));
      this.invoiceno = this.orders[0].invoiceNo;
      this.orderDetailsService.getOrderDetails(this.orders[0].invoiceNo, this.cartType).subscribe(
        (data) => {
          if (data) {
            this.orderdetails = data;
            if (this.orderdetails[0].productName != null) {
              this.isPoojaKit = true;
            }
            sessionStorage.removeItem("orders");
          }

        },
        (error) => {
          this.errorMessage = error;
        },
        () => {

        });
    }

  }
}
