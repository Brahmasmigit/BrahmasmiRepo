import { Component, OnInit , ViewChild,  ElementRef  } from '@angular/core';
import {VendorDetailsService} from './VendorDetails.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-vendordetails',
  templateUrl: './vendordetails.component.html',
  styleUrls: ['./vendordetails.component.css']
})
export class VendordetailsComponent implements OnInit {
  vendorDetails:any;errorMessage:any;  closeResult: string;vendor:any={};
  @ViewChild('mymodal') mymodal: ElementRef;
  constructor(private vendorDetailsService:VendorDetailsService
    ,    private  modalService: NgbModal,) { }

  ngOnInit(): void {
    this.getVendorInfo();
  }
  openDetailsPopup()
  {
  this.placeOrder(this.mymodal);
  }
  placeOrder(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass : "xlModalvendor"}).result.then((result) => {
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
  selectVendor(vendordata){
    console.log(vendordata)
    this.getVendorPreview(vendordata.vendorID);
    sessionStorage.setItem("vendorenquiry",JSON.stringify(vendordata));
      }
      getVendorInfo()
      {
        this.vendorDetailsService.getVendor().subscribe(
          (data) => {
              if (data) {
                  this.vendorDetails = data;
                  console.log(this.vendorDetails)
              }
          },
          (error) => {
              this.errorMessage = error;
          },
          () => {

          }

      );
      }
      getVendorPreview(vendorID)
      {
        this.vendorDetailsService.getVendorPreview(vendorID).subscribe(
          (data) => {
              if (data) {
                  this.vendor = data;
                  console.log(this.vendor)
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
