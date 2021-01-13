import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Vendor } from '../admindashboard.model';

@Component({
  selector: 'app-multivendorselectdropdown',
  templateUrl: './multivendorselectdropdown.component.html',
  styleUrls: ['./multivendorselectdropdown.component.css']
})
export class MultiVendorSelectDropdownComponent implements OnInit {

  showDropDown: boolean;
  @Input() vendor: Vendor;

  @Output() shareServiceCheckedVendorList = new EventEmitter();
  @Output() shareIndividualCheckedList = new EventEmitter();

  // item: ServicesTimings = {} as ServicesTimings;
  checkedVendorList: Vendor[] = {} as Vendor[];
  currentSelected: {};
  selectedServices: string[] = [];

  constructor() {
    this.checkedVendorList = [];
  }

  ngOnInit() {
    if (this.vendor.vendorIdData != null) {
      this.vendor.checked = [];
      this.vendor.vendorIdData.forEach(item => {
        this.vendor.checked.push(false);
      })
    }
  }

  getSelectedValue(checked: boolean, sId: number, bId: string, name: string, vId: string) {
    this.selectedServices = [];
    if (checked) {
      var item = {} as Vendor;
      item.serviceId = sId;
      item.bookingId = Number(bId);
      item.vendorName = name;
      item.vendorId = Number(vId);
      this.checkedVendorList.push(item);
      this.checkedVendorList.forEach(c => {
        this.selectedServices.push(c.vendorName);
      });
    } else {
      var index = this.checkedVendorList.findIndex(c => c.serviceId == sId && c.bookingId == Number(bId));
      this.checkedVendorList.splice(index, 1);
      this.checkedVendorList.forEach(c => {
        this.selectedServices.push(c.vendorName);
      });
    }

    // this.currentSelected = { checked: status, name: value };

    //share checked list
    this.shareCheckedlist();

    //share individual selected item
    // this.shareIndividualStatus();
  }
  shareCheckedlist() {
    this.shareServiceCheckedVendorList.emit(this.checkedVendorList);
  }
  // shareIndividualStatus() {
  //   this.shareIndividualCheckedList.emit(this.currentSelected);
  // }

}
