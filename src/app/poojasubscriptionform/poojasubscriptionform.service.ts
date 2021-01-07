import { Injectable } from "@angular/core"
import { Observable, BehaviorSubject, throwError  } from "rxjs"
import { HttpClient, HttpHeaders,HttpParams,HttpResponse   } from "@angular/common/http"
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment'


@Injectable()
export class poojasubscriptionformService {
    subscriptionID:any;
    private messageSource = new BehaviorSubject<any>(1);
    currentMessage = this.messageSource.asObservable();
    private API_URL : any= environment.API_URL;
    constructor(private http: HttpClient) {

    }
    FormRegister(service)
    {
        return this.http.post(this.API_URL + 'PoojaSubscriptionForm/SubscriptionForm/',service)
        .pipe(
            tap(status => console.log("status: " + status)),
            catchError(this.handleError)
        );
    }
    getSubscriptionCategory(): Observable<any> {
        return this.http.get<any>(this.API_URL + "PoojaSubscriptionForm/GetSubscriptionCategory" )
        .pipe(
            tap(status => console.log("status: " + status)),
            catchError(this.handleError)
        );
      }
      getPoojaServices(): Observable<any> {
        return this.http.get<any>(this.API_URL + "PoojaSubscriptionForm/GetPoojaServices" )
        .pipe(
            tap(status => console.log("status: " + status)),
            catchError(this.handleError)
        );
      }
      private handleError(error: any) {
        // console.error(error);
        return throwError(error);
    }
}