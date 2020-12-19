import { Component, OnInit } from '@angular/core';
import { TempleAdminService } from '../templeAdminService.services';
import { TempleServiceRequest } from '../templeservice.model';

@Component({
  selector: 'app-managetempleservicerequests',
  templateUrl: './managetempleservicerequests.component.html',
  styleUrls: ['./managetempleservicerequests.component.css']
})
export class ManagetempleservicerequestsComponent implements OnInit {

  templeServiceRequest: TempleServiceRequest[] = {} as TempleServiceRequest[];
  errorMessage: any;

  constructor(private templeAdminService: TempleAdminService) { }

  ngOnInit(): void {
    this.GetUserRequests();
  }

  GetUserRequests() {
    this.templeAdminService.GetTempleServiceUserRequest().subscribe((result) => {
      if (result) {
        if (result.length > 0) {
          console.log(result);
          this.templeServiceRequest = result;
        }
      }
    },
      error => {
        this.errorMessage = error;
      })
  }
}
