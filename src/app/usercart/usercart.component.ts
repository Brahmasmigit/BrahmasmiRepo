import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ToastService} from '../shared/services/toastservice'

@Component({
  selector: 'app-usercart',
  templateUrl: './usercart.component.html',
  styleUrls: ['./usercart.component.css']
})
export class UsercartComponent implements OnInit {

  cartitems:any=[];
  subtotal:number=0;
  discount:any=0;
  total:number=0;
  serviceId:any;
  serviceTypeId:any;
  constructor(private toastService: ToastService,private router: Router ,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.serviceId = params.serviceId;
      this.serviceTypeId = params.serviceTypeId;

    } );
    this.loadCart();
  }
  loadCart()
  {
    if(sessionStorage.getItem("orderdetails")!=null)
    {
    this.cartitems=JSON.parse(sessionStorage.getItem("orderdetails"));
    this.cartitems.forEach(element => {
      this.subtotal += element.Total;
    });
    this.total=this.subtotal;
    }
    else
    {
      this.subtotal=0;
      this.total=0;
    }
  }
  Delete(serviceid,i)
  {
    this.subtotal=0;
    this.total=0;
    this.cartitems.splice(i,1);
    sessionStorage.setItem("orderdetails", JSON.stringify(this.cartitems));
    this.loadCart();
  }
  BookAnotherService()
  {
    this.router.navigate(['/home']);
  }

}
