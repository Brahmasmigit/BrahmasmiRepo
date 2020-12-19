import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { TempleUserServiceRequest, UserServiceRequest } from 'src/app/admin/admintempleservices/templeservice.model';

@Component({
  selector: 'app-templeusercart',
  templateUrl: './templeusercart.component.html',
  styleUrls: ['./templeusercart.component.css']
})
export class TempleUserCartComponent implements OnInit {

  templeUserCartItems: TempleUserServiceRequest[] = {} as TempleUserServiceRequest[];
  templeUserCartItems1: UserServiceRequest = {} as UserServiceRequest;
  subTotal: number = 0;
  discount: number = 0;
  total: number = 0;
  accommodation: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.templeUserCartItems = [];
    this.LoadTempleCartItems();
  }

  LoadTempleCartItems() {
    if (sessionStorage.getItem("templeServiceDetails") != null || sessionStorage.getItem("templeServiceDetails") != undefined) {
      this.templeUserCartItems1 = JSON.parse(sessionStorage.getItem("templeServiceDetails"));
      console.log('temple', this.templeUserCartItems1);
      // this.accommodation = this.templeUserCartItems1.some(cart => cart.RoomTypeId > 0) ? true : false;
      this.accommodation = this.templeUserCartItems1.RoomTypeId > 0 ? true : false;
      this.CalculateTotalItemsPrice();
    }
  }

  CalculateTotalItemsPrice() {
    this.subTotal = 0;
    this.total = 0;
    // this.templeUserCartItems.forEach(item => {
    //   this.subTotal += item.ServicePrice;
    // });
    this.templeUserCartItems1.serviceDetails.forEach(item => {
      this.subTotal += item.ServicePrice;
    });
    // this.subTotal += this.templeUserCartItems[0].RoomPrice;
    // this.subTotal += this.templeUserCartItems[0].DarshanPrice;
    this.subTotal += this.templeUserCartItems1.RoomPrice;
    this.subTotal += this.templeUserCartItems1.DarshanPrice;

    this.total = this.subTotal;
  }

  BookAnotherTempleService() {
    console.log('book', this.templeUserCartItems1);
    sessionStorage.setItem("templeServiceDetails", JSON.stringify(this.templeUserCartItems1));
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "TempleId": this.templeUserCartItems1.TempleId
      }
    }
    this.router.navigate(['temple-details'], navigationExtras);

    // sessionStorage.setItem("templeServiceDetails", JSON.stringify(this.templeUserCartItems));
    // let navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     "TempleId": this.templeUserCartItems[0].TempleId
    //   }
    // }
    // this.router.navigate(['temple-details'], navigationExtras);
  }

  DeleteItem(serviceId: number, index: number) {
    console.log('del', serviceId, index);
    this.templeUserCartItems1.serviceDetails.splice(this.templeUserCartItems1.serviceDetails.findIndex(item => item.ServiceId == serviceId), 1);
    sessionStorage.setItem("templeServiceDetails", JSON.stringify(this.templeUserCartItems1));
    this.CalculateTotalItemsPrice();
    // console.log('del', serviceId, index);
    // this.templeUserCartItems.splice(this.templeUserCartItems.findIndex(item => item.ServiceId == serviceId), 1);
    // sessionStorage.setItem("templeServiceDetails", JSON.stringify(this.templeUserCartItems));
    // this.CalculateTotalItemsPrice();
  }

  CheckOut() {
    sessionStorage.setItem("templeServiceDetails", JSON.stringify(this.templeUserCartItems1));
    this.router.navigate(['/templeuserbilling']);
  }
}
