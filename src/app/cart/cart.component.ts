import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartCount:number;
  disableCart:boolean=false;
  constructor() { }

  ngOnInit(): void {
    if(sessionStorage.getItem("orderdetails")!=null)
    {
      this.disableCart=false;
      let cartitems:any=[]
      cartitems=JSON.parse(sessionStorage.getItem("orderdetails"));
      this.cartCount=cartitems.length;
      if(this.cartCount>0)
      {
        this.disableCart=false;
      }
      else
      {
        this.disableCart=true;
      }
    }
    else
    {
      this.disableCart=true;
    }

  }

}
