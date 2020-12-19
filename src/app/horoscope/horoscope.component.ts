import { Component, OnInit } from '@angular/core';
import {HoroscopeService} from './horoscope.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-horoscope',
  templateUrl: './horoscope.component.html',
  styleUrls: ['./horoscope.component.css']
})
export class HoroscopeComponent implements OnInit {
  Horoscope:any;errorMessage:any;TodayHoroscope:any;
  constructor(private horoscopeService:HoroscopeService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllHoroscopes();
    this.getTodayHoroscopes();
  }
  getAllHoroscopes()
  {

    this.horoscopeService.getHoroscopeSign().subscribe(
      (data) => {
          if (data) {
              this.Horoscope = data;

          }

      },
      (error) => {
          this.errorMessage = error;
      },
      () => {
      }
  );
}
getTodayHoroscopes()
{

  this.horoscopeService.getTodayHoroscope().subscribe(
    (data) => {
        if (data) {
            this.TodayHoroscope = data;
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
