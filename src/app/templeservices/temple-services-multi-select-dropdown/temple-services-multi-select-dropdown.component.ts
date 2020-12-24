import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServicesTimings, ServicesTimingsWithCheckBox } from 'src/app/admin/admintempleservices/templeservice.model';

@Component({
  selector: 'temple-services-multi-select-dropdown',
  templateUrl: './temple-services-multi-select-dropdown.component.html',
  styleUrls: ['./temple-services-multi-select-dropdown.component.css']
})
export class TempleServicesMultiSelectDropdownComponent implements OnInit {

  showDropDown: boolean;
  @Input() serviceList: ServicesTimingsWithCheckBox[] = [];

  @Output() shareServiceCheckedList = new EventEmitter();
  @Output() shareIndividualCheckedList = new EventEmitter();

  // item: ServicesTimings = {} as ServicesTimings;
  checkedList: ServicesTimings[] = {} as ServicesTimings[];
  currentSelected: {};
  selectedServices: string[] = [];

  constructor() {
    this.checkedList = [];
  }

  ngOnInit() {

  }

  bindBooleanValuesToList() {

  }

  getSelectedValue(checked: boolean, id: number, name: string, price: number) {
    this.selectedServices = [];
    if (checked) {
      var item = {} as ServicesTimings;
      item.serviceId = id;
      item.serviceName = name;
      item.servicePrice = price;
      this.checkedList.push(item);
      this.checkedList.forEach(c => {
        this.selectedServices.push(c.serviceName);
      });
    } else {
      var index = this.checkedList.findIndex(c => c.serviceId == id);
      this.checkedList.splice(index, 1);
      this.checkedList.forEach(c => {
        this.selectedServices.push(c.serviceName);
      });
    }

    // this.currentSelected = { checked: status, name: value };

    //share checked list
    this.shareCheckedlist();

    //share individual selected item
    // this.shareIndividualStatus();
  }
  shareCheckedlist() {
    // console.log('check', this.checkedList);
    this.shareServiceCheckedList.emit(this.checkedList);
  }
  // shareIndividualStatus() {
  //   this.shareIndividualCheckedList.emit(this.currentSelected);
  // }

}
