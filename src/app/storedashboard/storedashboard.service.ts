import { Injectable } from "@angular/core"
import { Observable, BehaviorSubject, throwError  } from "rxjs"
import { HttpClient, HttpHeaders,HttpParams,HttpResponse   } from "@angular/common/http"
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment'


@Injectable()
export class StoreDashboardService {

    private messageSource = new BehaviorSubject<any>(1);
    currentMessage = this.messageSource.asObservable();
    private API_URL : any= environment.API_URL;
    constructor(private http: HttpClient) {

    }

    getStoreOrderdetails(storeid,storetype,calendartype): Observable<any>
    {
      let params = new HttpParams()
        .set('storeid', storeid)
        .set('storetype', storetype)
        .set('calendartype', calendartype)
        return this.http.get<any>(this.API_URL + 'StoreDashboard/GetStoreOrderdetails', {params})
        .pipe(
            tap(status => console.log("status: " + status)),
            catchError(this.handleError)
        );
    }
    ChangeBookingStatus(booking)
    {
        return this.http.post(this.API_URL + 'StoreDashboard/ChangeBookingStatus',booking)
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
