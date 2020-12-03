import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import {ProductService} from '../products/products.service';
import {ProductDetailsService} from '../productdetails/productdetails.service';
import {Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { elementAt } from 'rxjs/internal/operators/elementAt';
import {ToastService} from '../shared/services/toastservice';
import {StockEntryService} from './stockentry.service';
import { NgForm } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-stockentry',
  templateUrl: './stockentry.component.html',
  styleUrls: ['./stockentry.component.css']
})
export class StockentryComponent implements OnInit {
  click : boolean = false;
  errorMessage:any;
  stock:any={};productDetails:any=[];
  stockDetails:any=[];
  products:any=[];storeID:number;productID:any;
  cityId:any;
  @ViewChild('stockEntryForm') myForm: NgForm;
  userInfo:any;
  storeid:any;
  @ViewChild('mymodal') mymodal: ElementRef;
  closeResult: string;
  constructor(private productService:ProductService,private router: Router
    ,private toastService: ToastService,
    private  modalService: NgbModal,
    private domSanitizer:DomSanitizer ,private activatedRoute: ActivatedRoute,
    private stockEntryService:StockEntryService,
  private productDetailsService:ProductDetailsService) { }

    ngOnInit(): void {

    if(sessionStorage.getItem("userInfo")!=null)
    {
        this.userInfo=JSON.parse(sessionStorage.getItem("userInfo"));
        this.storeid=this.userInfo.userId;
        this.click = true;
        this.cityId=1;
        this.getStockdetails(this.storeid);
        this.getProducts(this.cityId);
    }
    else
    {
      this.router.navigate(['/login']);
    }

    }
    onProductChange(index:number)
    {
      this.productDetails =[];
      // this.click = this.click;
      this.click = false;
      console.log(index);
      this.productID=Number(index);

    }
    onView()
    {
      this.productDetails =[];
      this.getProductDetails(this.productID);
    }
    getProductDetails(productID)
    {
      this.productDetailsService.getProductDetails(productID).subscribe(
        (data) => {
            if (data) {
                this.productDetails = data;
                console.log(this.productDetails)
            }
        },
        (error) => {
            this.errorMessage = error;
        },
        () => {

        });
    }
    getStockdetails(storeid)
    {
      this.stockEntryService.getStockDetails(storeid).subscribe(
        (data) => {
            if (data) {
                this.stockDetails = data;
            }
        },
        (error) => {
            this.errorMessage = error;
        },
        () => {

        });
    }

    getProducts(cityId)
    {
      this.productService.getAllProductsByCity(cityId).subscribe(
        (data) => {
            if (data) {
                this.products = data;
            }
        },
        (error) => {
            this.errorMessage = error;
        },
        () => {
        }
      );
    }
    AddStock(myForm: NgForm)
    {
      if(myForm.valid) {
        console.log('valid form');

     this.stock.StoreID=this.storeid;
     this.stock.productID=Number(this.stock.productID);
     this.stock.productQuantity=Number(this.stock.productQuantity);
     console.log(this.stock);
     this.stockEntryService.StockEntry(this.stock).subscribe(
       (data) => {
           if (data) {
            myForm.resetForm();
               if(data=="1")
               {
               this.showError('Submitted Successfully ...')
               this.stock={};
               this.modalService.dismissAll("closed");
               this.getStockdetails(this.storeid)
               }
               else
               {
                 this.showError('Product Entry details are not Saved, Please try after some time')
                 console.log("DB Exception");
               }
           }
       },
       (error) => {
           this.errorMessage = error;
       },
       () => {
       }
     );
    } else {
      console.log('invalid form');
     }
    }
    OpenStockForm()
    {
      this.stock={};
      this.productDetails =[];
      this.modalplaceOrder(this.mymodal);
    }
    modalplaceOrder(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass : "xlModal"}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }
    showError(msg) {
      this.toastService.show(msg, {
        classname: 'bg-info text-light',
        delay: 4000 ,
        autohide: true,
        headertext: 'Stock Entry details!'
      });
    }
  }
