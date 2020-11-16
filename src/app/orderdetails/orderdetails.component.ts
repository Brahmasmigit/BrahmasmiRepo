import { Component, OnInit, NgZone} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ToastService} from '../shared/services/toastservice'
import {OrderDetailsService} from '../orderdetails/orderdetails.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {

  orderdetails:any=[];
  orders:any=[];
  errorMessage:any;
  invoiceno:any;
  ngZone:NgZone;
  isReload:boolean=false;
  cartType:any;
  constructor(private toastService: ToastService,private activatedRoute: ActivatedRoute,
    private router:Router,
    private orderDetailsService:OrderDetailsService) {

    }

  ngOnInit(): void {

    this.getOrderdetails();
  }
  getOrderdetails()
  {
  if(sessionStorage.getItem("orders")!=null)
    {
      if(sessionStorage.getItem("cartType")!=null)
      {
        this.cartType=sessionStorage.getItem("cartType");
      }
    this.orders=JSON.parse(sessionStorage.getItem("orders"));
    this.invoiceno=this.orders[0].invoiceNo;
    this.orderDetailsService.getOrderDetails(this.orders[0].invoiceNo,this.cartType).subscribe(
      (data) => {
          if (data) {
              this.orderdetails = data;
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
