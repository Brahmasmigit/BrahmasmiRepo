import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auspiciousdates',
  templateUrl: './auspiciousdates.component.html',
  styleUrls: ['./auspiciousdates.component.css']
})
export class AuspiciousdatesComponent implements OnInit {
  jan1st:boolean=false;
  jan13th:boolean=false;
  jan14th:boolean=false;
  jan15th:boolean=false;
  jan26th:boolean=false;
  // dec27th:boolean=false;
  // dec29th:boolean=false;
  // dec30th:boolean=false;
  auspicious:any;
  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.auspicious= this.activatedRoute.snapshot.params['auspicious'];
    if(this.auspicious=="jan-1st.png")
    {
      this.jan1st=true;
    }
    if(this.auspicious=="jan-13th.png")
    {
      this.jan13th=true;
    }
    if(this.auspicious=="jan-14th.png")
    {
      this.jan14th=true;
    }
    if(this.auspicious=="jan-15th.png")
    {
      this.jan15th=true;
    }
    if(this.auspicious=="jan-26th.png")
    {
      this.jan26th=true;
    }
    // if(this.auspicious=="dec-27th.png")
    // {
    //   this.dec27th=true;
    // }
    // if(this.auspicious=="dec-29th.png")
    // {
    //   this.dec29th=true;
    // }
    // if(this.auspicious=="dec-30th.png")
    // {
    //   this.dec30th=true;
    // }
  }

}
