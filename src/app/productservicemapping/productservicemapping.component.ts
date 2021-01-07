import { Component, OnInit } from '@angular/core';
import {ProductServiceMappingService} from './ProductServiceMapping.service';
import { UtilitiesService } from '../shared/services/utilities.service';
import {ToastService} from '../shared/services/toastservice';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-productservicemapping',
  templateUrl: './productservicemapping.component.html',
  styleUrls: ['./productservicemapping.component.css']
})
export class ProductservicemappingComponent implements OnInit {
  Services:any;cities:any;
  Products:any;Packages:any;errorMessage:any;productServiceModel:any={};
  //@ViewChild('productForm') myForm: NgForm;
  constructor(private productServiceMappingService:ProductServiceMappingService,private utilitiesService:UtilitiesService,private toastService: ToastService) { }

  ngOnInit(): void {
    this.GetCities();
    this.getServices();
    this.getProducts();
  }
  SaveMapping()
  {
    console.log(this.productServiceModel.serviceID);
    this.productServiceModel.cityID=Number(this.productServiceModel.cityID);
    this.productServiceModel.serviceID=Number(this.productServiceModel.serviceID);
    this.productServiceModel.productID=Number(this.productServiceModel.productID);
    this.productServiceModel.packageID=Number(this.productServiceModel.packageID);
    console.log(this.productServiceModel)
     this.productServiceMappingService.saveMapping(this.productServiceModel).subscribe(
       (data) => {
           if (data) {
           // this.myForm.resetForm();
           if(data=="1")
           {
            this.showError("Product Service Mapping done Successfully..")
           }
           else
           if(data=="2")
           {
            this.showError("Mapping already done with this Service, please Add another..")
           }
           this.productServiceModel={};
            

           }
       },
       (error) => {
           this.errorMessage = error;
       },
       () => {
   
       }
     );
  }
  
  // selectCity(id: number) {

  //   this.getProducts(id);
  //   this.getServices(id);
  
  // }
  selectService(id: number) {
console.log(id)
console.log(this.productServiceModel.serviceID)
    this.getPackages(id);
  
  }
  GetCities()
  {
    this.utilitiesService.getAllCities().subscribe(
      (data) => {
          if (data) {
              this.cities = data;
          }
      },
      (error) => {
          this.errorMessage = error;     
      },
      () => {
      }
  );
  }
  getProducts()
  {
    this.productServiceMappingService.getAllProducts().subscribe(
      (data) => {
          if (data) {
              this.Products = data;
          }
      },
      (error) => {
          this.errorMessage = error;     
      },
      () => {
      }
  );
  }
  getServices()
  {
    this.productServiceMappingService.getAllServices().subscribe(
      (data) => {
          if (data) {
              this.Services = data;
          }
      },
      (error) => {
          this.errorMessage = error;     
      },
      () => {
      }
  );
  }
  getPackages(serviceID)
  {
    this.productServiceMappingService.getAllPackages(serviceID).subscribe(
      (data) => {
          if (data) {
              this.Packages = data;
              console.log(data)
          }
      },
      (error) => {
          this.errorMessage = error;     
      },
      () => {
      }
  );
  }
  showError(msg) {
    this.toastService.show(msg, {
      classname: 'bg-info text-light',
      delay: 3000 ,
      autohide: true,
      headertext: 'Product Service Mapping!'
    });
  }
}
