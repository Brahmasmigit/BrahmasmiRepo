import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { State, Temple, TempleTypeData, TempleWithType } from '../admin/admintempleservices/templeservice.model';
import { TempleService } from '../admin/admintempleservices/templeService.services';
import { UtilitiesService } from '../shared/services/utilities.service';
import { TempleservicesService } from './templeservices.service';

@Component({
  selector: 'app-templeservices',
  templateUrl: './templeservices.component.html',
  styleUrls: ['./templeservices.component.css']
})
export class TempleservicesComponent implements OnInit {
  endowmentTemple: TempleWithType[] = [];
  nonEndowmentTemple: TempleWithType[] = [];
  etTemple: TempleWithType[] = [];
  netTemple: TempleWithType[] = [];
  States: State;
  errorMessage: any;
  etStateId: number;
  netStateId: number;
  templeDetails: Temple;

  constructor(private templesService: TempleservicesService, private utilitiesService: UtilitiesService, private templeService: TempleService, private router: Router) { }

  ngOnInit(): void {
    this.getTemplesTypesList();
    this.getState();
  }

  getTemplesTypesList() {
    this.templesService.GetTemplesTypesList().subscribe((result) => {
      if (result && result.length > 0) {
        this.endowmentTemple = result.filter(temple => temple.templeTypeId == TempleTypeData.EndowmentTemple);
        this.nonEndowmentTemple = result.filter(temple => temple.templeTypeId == TempleTypeData.NonEndowmentTemple);
        this.etTemple = this.endowmentTemple;
        this.netTemple = this.nonEndowmentTemple;
        console.log('end, nonend', this.endowmentTemple, this.nonEndowmentTemple);
      }
    })
  }

  getState() {
    this.utilitiesService.getStates().subscribe((data) => {
      if (data)
        this.States = data;
    },
      (error) => {
        this.errorMessage = error;
      });
  }

  onEtStateChange() {
    console.log('etstate', this.etStateId);
    this.etTemple = this.etStateId == 0 ? this.endowmentTemple : this.endowmentTemple.filter(tmp => tmp.stateId == this.etStateId);
  }

  onNetStateChange() {
    console.log('netState', this.netStateId);
    this.netTemple = this.netStateId == 0 ? this.nonEndowmentTemple : this.nonEndowmentTemple.filter(tmp => tmp.stateId == this.netStateId);
  }

  showTempleDetails(templeId: number) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "TempleId": templeId
      }
    }
    this.router.navigate(['temple-details'], navigationExtras);
  }

}
