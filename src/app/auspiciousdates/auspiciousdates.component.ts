import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auspiciousdates',
  templateUrl: './auspiciousdates.component.html',
  styleUrls: ['./auspiciousdates.component.css']
})
export class AuspiciousdatesComponent implements OnInit {
  dec11th:boolean=false;
  dec15th:boolean=false;
  dec19th:boolean=false;
  dec20th:boolean=false;
  dec25th:boolean=false;
  dec27th:boolean=false;
  dec29th:boolean=false;
  dec30th:boolean=false;
  auspicious:any;
  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.auspicious= this.activatedRoute.snapshot.params['auspicious'];
    if(this.auspicious=="dec-11th.png")
    {
      this.dec11th=true;
    }
    if(this.auspicious=="dec-15th.png")
    {
      this.dec15th=true;
    }
    if(this.auspicious=="dec-19th.png")
    {
      this.dec19th=true;
    }
    if(this.auspicious=="dec-20th.png")
    {
      this.dec20th=true;
    }
    if(this.auspicious=="dec-25th.png")
    {
      this.dec25th=true;
    }
    if(this.auspicious=="dec-27th.png")
    {
      this.dec27th=true;
    }
    if(this.auspicious=="dec-29th.png")
    {
      this.dec29th=true;
    }
    if(this.auspicious=="dec-30th.png")
    {
      this.dec30th=true;
    }
  }

}
