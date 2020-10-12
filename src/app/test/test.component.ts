import { Component, OnInit } from '@angular/core';
import {UtilitiesService} from '../shared/services/utilities.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  errorMessage:string;
  userDetails:any;
  patientModel:any={};
  patientData:any=[];
  constructor(private utilitiesService:UtilitiesService) { }

  ngOnInit(): void {
    this.getPatientData();
  }
  getPatientData()
  {
    let statusid=0;
    let bookingdate=null;
    this.utilitiesService.getpatientdata().subscribe(
      (data) => {
          if (data) {
              this.patientData = data;
          }

      },
      (error) => {
          this.errorMessage = error;
      },
      () => {

      });
  }
  SavePatient()
  {
    this.utilitiesService.SavePatient(this.patientModel).subscribe(
      (data) => {
          if (data) {
             if(data=="1")
             {
              this.patientModel.PatientName="";
              this.patientModel.PatientIllness="";
              this.getPatientData();
             }
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
