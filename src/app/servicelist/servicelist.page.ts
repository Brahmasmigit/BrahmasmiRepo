import { Component, OnInit } from '@angular/core';
import {ServiceListService} from './servicelist.service';
import { LoadingController } from '@ionic/angular';  
import { ActivatedRoute,Router } from '@angular/router';  

@Component({
  selector: 'app-servicelist',
  templateUrl: './servicelist.page.html',
  styleUrls: ['./servicelist.page.scss'],
})
export class ServicelistPage implements OnInit {

  services:[]=[];
  errorMessage:any;languageName:any;cityId:any;servicetypeId:any;
  loaderToShow: any=false;  
  constructor(private serviceListService:ServiceListService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.servicetypeId= this.activatedRoute.snapshot.params['servicetypeId'];
    this.cityId= this.activatedRoute.snapshot.params['cityId'];
    this.languageName= this.activatedRoute.snapshot.params['languageName'];
    this.getServices(this.servicetypeId, this.cityId)
  }
  getServices(servicetypeId, cityId)
  {
    this.showLoader();
    this.serviceListService.getServices(servicetypeId,cityId).subscribe(
      (data) => {
          if (data) {
              this.services = data;
          }

      },
      (error) => {
          this.errorMessage = error; 
          console.log(error);    
          this. hideLoader();
      },
      () => {
        this. hideLoader();
      });
  }
  showLoader() {  
    this.loaderToShow = this.loadingCtrl.create({  
      message: 'Loading...'  
    }).then((res) => {  
      res.present();  
   
      res.onDidDismiss().then((dis) => {  
      });  
    });  
    //this.hideLoader();  
  }  
   
  hideLoader() {  
    this.loadingCtrl.dismiss();   
  } 
  Back()
  {
    this.router.navigate(['/servicetype']); 
  }
  Navigate(servicetypeId,serviceid,cityId,languageName)
  {
    var language=languageName !=undefined ? languageName: '';
    this.router.navigate(['/vendorsearchmap',servicetypeId,serviceid,cityId,language]); 
  }
}
