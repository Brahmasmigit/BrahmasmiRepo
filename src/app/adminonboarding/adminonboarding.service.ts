import { Injectable } from "@angular/core"
import { Observable, BehaviorSubject, throwError  } from "rxjs"
import { HttpClient, HttpHeaders,HttpParams,HttpResponse   } from "@angular/common/http"
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment'
 
@Injectable()
export class adminOnBoardingService {
    OnBoardingID:any;
    private messageSource = new BehaviorSubject<any>(1);
    currentMessage = this.messageSource.asObservable();
    private API_URL : any= environment.API_URL;
    constructor(private http: HttpClient) {
 
    }
    getVedapatashalaOnBoarding(): Observable<any> {
        return this.http.get<any>(this.API_URL + "VedapatashalaOnBoarding/GetVedapatashalaOnBoarding" )
        .pipe(
            tap(status => console.log("status: " + status)),
            catchError(this.handleError)
        );
      }
    private handleError(error: any) {
        console.error(error);
        return throwError(error);
    }
}