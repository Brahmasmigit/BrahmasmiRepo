import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccommodationTimings, AccommodationTimingsWithCheckBox } from 'src/app/admin/admintempleservices/templeservice.model';

@Component({
  selector: 'accommodation-multi-select-down',
  templateUrl: './accommodation-multi-select-down.component.html',
  styleUrls: ['./accommodation-multi-select-down.component.css']
})
export class AccommodationMultiSelectDownComponent implements OnInit {

  showDropDown: boolean;
  @Input() acmdList: AccommodationTimingsWithCheckBox[] = [];

  @Output() shareAcmdCheckedlist = new EventEmitter();
  @Output() shareIndividualCheckedList = new EventEmitter();

  checkedList: AccommodationTimings[] = {} as AccommodationTimings[];
  currentSelected: {};
  selectedAccommodation: string[] = [];

  constructor() {
    this.checkedList = [];
  }

  ngOnInit() {

  }

  bindBooleanValuesToList() {

  }

  getSelectedValue(checked: boolean, id: number, name: string, price: number) {
    this.selectedAccommodation = [];
    if (checked) {      
      var item = {} as AccommodationTimings;
      item.roomTypeId = id;
      item.roomType = name;
      item.roomPrice = price;
      this.checkedList.push(item);
      this.checkedList.forEach(data => {
        this.selectedAccommodation.push(data.roomType);
      });
    } else {
      var index = this.checkedList.findIndex(c => c.roomTypeId == id);
      this.checkedList.splice(index, 1);
      this.checkedList.forEach(data => {
        this.selectedAccommodation.push(data.roomType);
      });
    }

    // this.currentSelected = { checked: status, name: value };

    //share checked list
    this.shareCheckedlist();

    //share individual selected item
    // this.shareIndividualStatus();
  }
  shareCheckedlist() {
    console.log('check', this.checkedList);
    this.shareAcmdCheckedlist.emit(this.checkedList);
  }
  // shareIndividualStatus() {
  //   this.shareIndividualCheckedList.emit(this.currentSelected);
  // }

}
