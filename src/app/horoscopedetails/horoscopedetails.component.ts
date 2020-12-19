import { Component, OnInit } from '@angular/core';

import { AnonymousSubject } from 'rxjs/internal/Subject';
import {HoroscopeDetailsService} from './horoscopedetails.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-horoscopedetails',
  templateUrl: './horoscopedetails.component.html',
  styleUrls: ['./horoscopedetails.component.css']
})
export class HoroscopedetailsComponent implements OnInit {
  HoroscopeDetails:any;
  HoroscopeSign:any;
  errorMessage:any;horoscopeID:any;
  constructor(private horoscopeDetailsService:HoroscopeDetailsService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.horoscopeID= this.activatedRoute.snapshot.params['horoscopeID'];
    this.getHoroscopedetails(this.horoscopeID);
  }
  getHoroscopedetails(horoscopeID)
  {

    this.horoscopeDetailsService.getHoroscopeDetails(horoscopeID).subscribe(
      (data) => {
          if (data) {
              this.HoroscopeDetails = data;
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
}
