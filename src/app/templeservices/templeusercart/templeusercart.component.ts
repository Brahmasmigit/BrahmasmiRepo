import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TempleUserServiceRequest, UserServiceRequest } from 'src/app/admin/admintempleservices/templeservice.model';

@Component({
  selector: 'app-templeusercart',
  templateUrl: './templeusercart.component.html',
  styleUrls: ['./templeusercart.component.css']
})
export class TempleUserCartComponent implements OnInit {

  templeUserCartItems1: TempleUserServiceRequest[] = {} as TempleUserServiceRequest[];
  templeUserCartItems: UserServiceRequest = {} as UserServiceRequest;
  subTotal: number = 0;
  discount: number = 0;
  total: number = 0;
  accommodation: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.LoadTempleCartItems();
  }

  LoadTempleCartItems() {
    if (sessionStorage.getItem("templeServiceDetails") != null || sessionStorage.getItem("templeServiceDetails") != undefined) {
      this.templeUserCartItems = JSON.parse(sessionStorage.getItem("templeServiceDetails"));
      console.log('temple', this.templeUserCartItems);
      this.CalculateTotalItemsPrice();
    }
  }

  CalculateTotalItemsPrice() {
    this.subTotal = 0;
    this.total = 0;
    this.templeUserCartItems.serviceDetails.forEach(item => {
      this.subTotal += item.ServicePrice;
    });
    this.templeUserCartItems.accommodationDetails.forEach(item => {
      this.subTotal += item.RoomPrice
    });

    this.total = this.subTotal;
  }

  // BookAnotherTempleService() {
  //   console.log('book', this.templeUserCartItems1);
  //   sessionStorage.setItem("templeServiceDetails", JSON.stringify(this.templeUserCartItems1));
  //   let navigationExtras: NavigationExtras = {
  //     queryParams: {
  //       "TempleId": this.templeUserCartItems.TempleId
  //     }
  //   }
  //   this.router.navigate(['temple-details'], navigationExtras);

  //   // sessionStorage.setItem("templeServiceDetails", JSON.stringify(this.templeUserCartItems));
  //   // let navigationExtras: NavigationExtras = {
  //   //   queryParams: {
  //   //     "TempleId": this.templeUserCartItems[0].TempleId
  //   //   }
  //   // }
  //   // this.router.navigate(['temple-details'], navigationExtras);
  // }

  DeleteItem(serviceId: number, index: number) {
    console.log('del', serviceId, index);
    this.templeUserCartItems.serviceDetails.splice(this.templeUserCartItems.serviceDetails.findIndex(item => item.ServiceId == serviceId), 1);
    sessionStorage.setItem("templeServiceDetails", JSON.stringify(this.templeUserCartItems));
    this.CalculateTotalItemsPrice();
  }

  CheckOut() {
    sessionStorage.setItem("templeServiceDetails", JSON.stringify(this.templeUserCartItems));
    this.router.navigate(['/templeuserbilling']);
  }
}