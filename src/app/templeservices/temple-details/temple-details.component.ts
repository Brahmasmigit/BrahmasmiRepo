import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesTimings, Temple } from 'src/app/admin/admintempleservices/templeservice.model';
import { TempleService } from 'src/app/admin/admintempleservices/templeService.services';

@Component({
  selector: 'app-temple-details',
  templateUrl: './temple-details.component.html',
  styleUrls: ['./temple-details.component.css']
})
export class TempleDetailsComponent implements OnInit {

  templeId: number;
  templeDetails: Temple;
  errorMessage: any;
  servicesTimings: ServicesTimings[] = [];

  constructor(private route: ActivatedRoute, private templeService: TempleService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.templeId = params["TempleId"];
    });
    this.ShowTempleDetails();
  }

  ShowTempleDetails() {
    this.templeService.GetTemples(this.templeId).subscribe((data) => {
      if (data) {
        this.templeDetails = data[0];
        this.getServiceTimings();
        console.log('temp data', this.templeDetails);
      }
    },
      (error) => {
        this.errorMessage = error;
      });
  }

  getServiceTimings() {
    this.templeService.GetServicesTimings(this.templeId).subscribe((data) => {
      if (data) {
        this.servicesTimings = data;
        console.log('serv tim', this.servicesTimings);
      }
    },
      (error) => {
        this.errorMessage = error;
      });
  }

}
