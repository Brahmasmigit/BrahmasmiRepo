import { Injectable } from "@angular/core"
import { Observable, BehaviorSubject, throwError  } from "rxjs"
import { HttpClient, HttpHeaders,HttpParams,HttpResponse   } from "@angular/common/http"
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


@Injectable()
export class AdminProductDashboardService {

    private messageSource = new BehaviorSubject<any>(1);
    currentMessage = this.messageSource.asObservable();
    private API_URL : any= environment.API_URL;
    constructor(private http: HttpClient) {

    }

    getbookingdata(statusid,bookingdate): Observable<any> {
        let params = new HttpParams()
        .set('statusid', statusid)
        .set('bookingdate', bookingdate)
        return this.http.get<any>(this.API_URL + "AdminProduct/GetBookingData" , {params})
        .pipe(
            tap(status => console.log("status: " + status)),
            catchError(this.handleError)
        );
    }
    ChangeBookingStatus(booking)
    {
        return this.http.post(this.API_URL + 'AdminProduct/ChangeBookingStatus',booking)
        .pipe(
            tap(status => console.log("status: " + status)),
            catchError(this.handleError)
        );
    }
    UpdateStore(booking)
    {
        return this.http.post(this.API_URL + 'AdminProduct/UpdateVendor',booking)
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
