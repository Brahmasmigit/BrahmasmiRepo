import { Component, OnInit } from '@angular/core';
import { ToastController,AlertController  } from '@ionic/angular'; 
import { LoadingController,NavController } from '@ionic/angular';  
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-loginhome',
  templateUrl: './loginhome.page.html',
  styleUrls: ['./loginhome.page.scss'],
})
export class LoginhomePage implements OnInit {

  constructor(   
    public toastCtrl: ToastController,
   private route: Router) { }

  ngOnInit() {
  }
  Login(isotp)
  {
    this.route.navigate(['./login',isotp]);
  }

}
