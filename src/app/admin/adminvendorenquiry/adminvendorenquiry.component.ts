import { Component, OnInit } from '@angular/core';
import {VendorEnquiryService} from '../../vendorenquiry/vendorenquiry.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-adminvendorenquiry',
  templateUrl: './adminvendorenquiry.component.html',
  styleUrls: ['./adminvendorenquiry.component.css']
})
export class AdminvendorenquiryComponent implements OnInit {
  errorMessage:any;
  vendorDetails:any=[];
  constructor(private vendorEnquiryService : VendorEnquiryService,
    private route: Router) { }

  ngOnInit(): void {
    this.getVendorInfo();
  }

  selectVendor(index: any){
    alert(index.name)
      }
      getVendorInfo()
      {
        this.vendorEnquiryService.getVendor().subscribe(
          (data) => {
              if (data) {
                  this.vendorDetails = data;
              }

          },
          (error) => {
              this.errorMessage = error;
          },
          () => {

          }

      );
      }

}
