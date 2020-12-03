import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {VendorSearchService} from './vendorsearch.service';
import {EventModel} from '../shared/models/eventmodel';
import {EventListenerService} from '../shared/services/eventlistener.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {UtilitiesService} from '../shared/services/utilities.service';

@Component({
  selector: 'app-vendorsearch',
  templateUrl: './vendorsearch.component.html',
  styleUrls: ['./vendorsearch.component.css']
})
export class VendorsearchComponent implements OnInit {
  isChecked :boolean;
  vendor:[]=[];
  errorMessage:any;
  booking:any={};
  vendorId:any;
  userInfo:any={};
  closeResult: string;
  City:any;
  selectedCity:any;
  region:any="";
  cityID:any;
  constructor(private activatedRoute: ActivatedRoute,
    private vendorSearchService:VendorSearchService,
    private router:Router,
    private  modalService: NgbModal,
    private utilitiesService:UtilitiesService,
    private eventListenerService:EventListenerService) { }

  ngOnInit(): void {
    this.cityID=1;
    this.getAllCity();
    this.SearchVendor();
  }

  SearchVendor()
  {
   // let cityid=this.selectedCity !=undefined ? Number(this.selectedCity.cityID) : 0;
    let region = this.region !=undefined ? this.region: "";
    this.vendorSearchService.SearchVendor(this.cityID,region).subscribe(
      (data) => {
          if (data) {
              this.vendor = data;
          }

      },
      (error) => {
          this.errorMessage = error;
      },
      () => {

      });
  }
  Book(vendorid)
  {
    sessionStorage.setItem("bookingvendorid",JSON.stringify(vendorid));
    this.router.navigate(['/vendorbooking']);
  }
  getAllCity()
  {
    this.utilitiesService.getAllCities().subscribe(
      (data) => {
          if (data) {
              this.City = data;

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
