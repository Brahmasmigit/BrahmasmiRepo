import { Component, OnInit } from '@angular/core';
import {HoroscopeService} from '../../horoscope/horoscope.service';
import {HoroscopeMasterService} from './horoscopemaster.service';
import {ToastService} from '../../shared/services/toastservice';
@Component({
  selector: 'app-horoscopemaster',
  templateUrl: './horoscopemaster.component.html',
  styleUrls: ['./horoscopemaster.component.css']
})
export class HoroscopemasterComponent implements OnInit {
  Horoscope:any;errorMessage:any;horoscopeModel:any={};  modules = {};
  constructor(private horoscopeService:HoroscopeService,private horoscopeMasterService:HoroscopeMasterService,
    private toastService: ToastService,) {
      this.addModules();
    }

  ngOnInit(): void {
    this.getAllHoroscopes();
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
AddHoroscope()
{
  this.horoscopeModel.horoscopeID=Number( this.horoscopeModel.horoscopeID);
  console.log(this.horoscopeModel);
     this.horoscopeMasterService.addHoroscope(this.horoscopeModel).subscribe(
       (data) => {
           if (data) {
               if(data=="1")
               {

              this.showError('Horoscope details saved Successfully...')
               this.horoscopeModel={};
               }
               else
               if(data=="2")
               {

              this.showError('Horoscope already saved with this date, Please add another one...')
               this.horoscopeModel={};
               }
               else
               {
               this.showError('Details are not Saved, Please try after some time')
               console.log("DB Exception");
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
addModules() {
  this.modules = {
    'emoji-shortname': true,
    'emoji-textarea': true,
    'emoji-toolbar': true,
    'toolbar': [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],                                         // remove formatting button

      ['link', 'image', 'video'],                         // link and image, video
      ['emoji']

    ]
  }
}

showError(msg) {
  this.toastService.show(msg, {
    classname: 'bg-info text-light',
    delay: 5000 ,
    autohide: true,
    headertext: 'Contact details!'
  });
}
}
