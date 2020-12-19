import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductMasterService } from './productmaster.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup ,FormsModule} from "@angular/forms";
import 'quill-emoji/dist/quill-emoji.js';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import {UtilitiesService} from '../../shared/services/utilities.service';
import {ProductCategoriesService} from '../../productcategories/productcategories.service';
import { iterator } from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-productmaster',
  templateUrl: './productmaster.component.html',
  styleUrls: ['./productmaster.component.css']
})
export class ProductmasterComponent implements OnInit {
  errorMessage: any;
  productModel: any = {};
  product: any;
  fileToUpload: File = null;
  imageURL: any;
  uploadForm: FormGroup;
  modules = {};
  content = '';
  Cities:any;
  UploadedFile:File;
 base64Image:any;
 btntext:string;
 strtext:string;
 productForm:FormGroup;
 detail:any=[];
 newItem:any={};
 newKeyInsights:any={};
 ItemArray: Array<ProductDetails> = [];
 KeyInsightsArray:Array<KeyInsights>=[];
 KeyInsights:boolean=false;
 Items:boolean=false;
 itemcategories:any;
 //ProductItemsArray:any={};
 ProductItemsArray: Array<ProductDetails>=[];
 ProductItems: any;
 productcategories:any;
  constructor(private productMasterService: ProductMasterService, private route: Router,private productCategoriesService:ProductCategoriesService,
    private domSanitizer:DomSanitizer,private formBuilder:FormBuilder,private utilitiesService :UtilitiesService) {
    this.addModules();}

  ngOnInit(): void {
    this.newItem = {ItemName: "", ItemQuantity:""};
    this.ItemArray.push(this.newItem);
    this.newKeyInsights = {ProductKeyInsightsName: ""};
    this.KeyInsightsArray.push(this.newKeyInsights);
    this.getProducts();
    this.getCity();
    this.btntext="Save";
    this. getProductCategories();
  }

  selectCategory(id) {
  console.log(id)
  if(id==1)
  {
    this.Items=true;
    this.getItemCategories();
    this.KeyInsights=false;
    this.KeyInsightsArray=[];
    this.newKeyInsights = {ProductKeyInsightsName: ""};
    this.KeyInsightsArray.push(this.newKeyInsights);
  }
  else
  {
    this.Items=false;
    this.ItemArray=[];
    this.newItem = {ItemName: "", ItemQuantity:""};
    this.ItemArray.push(this.newItem);
    this.KeyInsights=true;
  }

  }
  deleteItem(index) {
    if(this.ItemArray.length ==1) {
        return false;
    } else {
        this.ItemArray.splice(index, 1);
        return true;
    }
}
addItem(index) {
  this.newItem = {ItemName: "", ItemQuantity: ""};
  this.ItemArray.push(this.newItem);
  return true;
}
deleteKey(index) {
  if(this.KeyInsightsArray.length ==1) {
      return false;
  } else {
      this.KeyInsightsArray.splice(index, 1);
      return true;
  }
}
addKey(index) {
this.newKeyInsights = {ProductKeyInsightsName: ""};
this.KeyInsightsArray.push(this.newKeyInsights);
return true;
}
  upload(event)
  {
    const file = (event.target as HTMLInputElement).files[0];
   // this.UploadedFile=files[0].name;
    this.UploadedFile = event.target.files[0];
    console.log(this.UploadedFile)
    console.log(this.UploadedFile.name)
    const reader = new FileReader();
     reader.onload = () => {
       this.imageURL = reader.result as string;
     }
     reader.readAsDataURL(file)
  }
  getProducts()
  {
    this.productMasterService.getProducts().subscribe(
      (data) => {
        if (data) {
          this.product= data;
          console.log(this.product)
        }
      },
      (error) => {
        this.errorMessage = error;
      },
      () => {

      }

    );
  }
  getCity()
  {

    this.utilitiesService.getAllCities().subscribe(
      (data) => {
          if (data) {
              this.Cities = data;
          }
      },
      (error) => {
          this.errorMessage = error;
      },
      () => {

      }

  );
}
  AddProduct()  {
//     console.log(this.productModel.items);
//     this.strtext =this.productModel.items;
//    // this.ProductItems = {ItemName: ""};
//     this.detail = this.strtext.split(',');
//      console.log(this.detail)
//     let myArray = [];
// let ItemData = {} as ProductDetails;

//   for(var i=0;i<this.detail.count;i++)
//     {

//       ItemData.ItemName = this.detail[i];
// myArray.push(ItemData);
//     }

//     console.log(myArray)
//     this.vendor.VendorRelationShips=this.RelationArray;



    // for(var i=0;i<this.detail.count;i++)
    // {
    //   this.ProductItemsArray.push(this.detail[i]);
    // }

    // console.log(this.ProductItemsArray)
    // this.productModel.items=this.ProductItemsArray;

    if (this.UploadedFile == null || this.UploadedFile == undefined) {
      alert("Please upload a file");
      return;
    }
    if(this.Items==true)
    {
      this.productModel.ProductKitItems=this.ItemArray;
    }
    else
    if(this.KeyInsights==true)
    {
      this.productModel.ProductkeyInsights=this.KeyInsightsArray;
    }

      console.log(this.productModel);
    const formData=new FormData();
    if( this.btntext=="Save")
    {
      formData.append('action','Save');

    }
    if( this.btntext=="Update")
    {

      formData.append('action','Update');

    }
    if(this.productModel.productID=='')
    {
      formData.append('productID','');
    }
    else{
      formData.append('productID',this.productModel.productID);
    }
    if(this.productModel.cityID!=undefined)
    {
      this.productModel.cityID=Number(this.productModel.cityID);
    }
    if(this.productModel.productCategoryID!=undefined)
    {
      this.productModel.productCategoryID=Number(this.productModel.productCategoryID);
    }
    if(this.productModel.productPrice!=undefined)
    {
      this.productModel.productPrice=Number(this.productModel.productPrice);
    }
    formData.append('productImage', this.UploadedFile);

    formData.append('cityID',this.productModel.cityID);
    formData.append('productcategoryID',this.productModel.productCategoryID);
    formData.append('productName',this.productModel.productName);
    formData.append('productPrice',this.productModel.productPrice);
    formData.append('productShortDescription',this.productModel.productShortDescription);
    formData.append('productLongDescription',this.productModel.productLongDescription);
    if(this.Items==true)
    {

      formData.append('kitItems',JSON.stringify(this.ItemArray));
      formData.append('keyInsights',null);
    }
    else
    if(this.KeyInsights==true)
    {
      formData.append('keyInsights',JSON.stringify(this.KeyInsightsArray));
      formData.append('kitItems',null);
    }



      //formData.append('kitItems',this.productModel.productItems);


    //this.serviceModel.serviceTypeID = Number(this.serviceModel.serviceTypeID);
    //this.serviceTypeModel.cityIDthis.fileUploadForm.get('serviceTypeImage').value
    console.log(this.productModel)
    console.log(formData)
    this.productMasterService.SaveProduct(formData).subscribe(
      (data) => {
        if (data) {
          var c = data;
          if(this.btntext=="Save")
          {
            alert('Product Saved Successfully...')
          }
          if(this.btntext=="Update")
          {
            alert('Product Updated Successfully...')
          }
          this.btntext="Save";
         // this.ngOnInit();
         this.imageURL='';
         this.productModel={};
         this.ItemArray=[];
         this.Items=false;
         this.KeyInsights=false;
         this.KeyInsightsArray=[];
         this.getProducts();
         //this.serviceForm.reset();
        }
      },
      (error) => {
        this.errorMessage = error;
      },
      () => {
      }
    );
  }
  getProductCategories()
  {
    this.productCategoriesService.getProductCategories().subscribe(
      (data) => {
          if (data) {
              this.productcategories = data;
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
  getItemCategories()
  {
    this.productMasterService.getItemCategories().subscribe(
      (data) => {
          if (data) {
              this.itemcategories = data;
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
  addModules() {
    this.modules = {
      'emoji-shortname': true,
      'emoji-textarea': true,
      'emoji-toolbar': true,
      'toolbar': [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean'],                                         // remove formatting button

        ['link', 'image', 'video'],                         // link and image, video
        ['emoji']

      ]
    }
  }
}
export class ProductDetails{
  ItemName:string;
  ItemQuantity:number;

}
export class KeyInsights
{
  ProductKeyInsightsName:string;
}

