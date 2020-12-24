import { Component, NgZone, OnInit } from '@angular/core';
import { TempleOrderDetailsAccommodation, TempleOrderDetailService } from 'src/app/admin/admintempleservices/templeservice.model';
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
  templeServiceDetails: TempleOrderDetailService[] = {} as TempleOrderDetailService[];
  templeAccommodationDetails: TempleOrderDetailsAccommodation[] = {} as TempleOrderDetailsAccommodation[];

  constructor(private templeOrderDetailsService: TempleOrderDetailsService) { }

  ngOnInit(): void {
    this.getOrderdetails();
  }
  getOrderdetails() {
    if (sessionStorage.getItem("templeorders") != null) {
      this.orders = JSON.parse(sessionStorage.getItem("templeorders"));
      this.invoiceno = this.orders[0].invoiceNo;
      this.templeOrderDetailsService.getTempleOrderDetails(this.invoiceno).subscribe(
        (data) => {
          if (data) {
            this.templeServiceDetails = data["item1"];
            this.templeAccommodationDetails = data["item2"];
            sessionStorage.removeItem("templeorders");
            console.log('order detail', data);
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
