import { Component, NgZone, OnInit } from '@angular/core';
import { TempleOrderDetails } from 'src/app/admin/admintempleservices/templeservice.model';
import { OrderDetailsService } from 'src/app/orderdetails/orderdetails.service';
import { TempleOrderDetailsService } from './templeorderdetails.service';

@Component({
  selector: 'app-templeorderdetails',
  templateUrl: './templeorderdetails.component.html',
  styleUrls: ['./templeorderdetails.component.css']
})
export class TempleOrderDetailsComponent implements OnInit {

  orderdetails: any = [];
  orders: any = [];
  errorMessage: any;
  invoiceno: any;
  ngZone: NgZone;
  isReload: boolean = false;
  cartType: any;
  templeOrderDetails: TempleOrderDetails[] = {} as TempleOrderDetails[];

  constructor(private templeOrderDetailsService: TempleOrderDetailsService) { }

  ngOnInit(): void {

    this.getOrderdetails();
  }
  getOrderdetails() {
    if (sessionStorage.getItem("templeorders") != null) {
      // if (sessionStorage.getItem("cartType") != null) {
      //   this.cartType = sessionStorage.getItem("cartType");
      // }
      this.orders = JSON.parse(sessionStorage.getItem("templeorders"));
      this.invoiceno = this.orders[0].invoiceNo;
      this.templeOrderDetailsService.getTempleOrderDetails(this.orders[0].invoiceNo).subscribe(
        (data) => {
          if (data) {
            this.templeOrderDetails = data;
            sessionStorage.removeItem("templeorders");
            console.log('order detail', this.templeOrderDetails);
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
