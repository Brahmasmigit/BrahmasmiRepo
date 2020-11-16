import { Injectable } from "@angular/core"
import { Observable, BehaviorSubject, throwError  } from "rxjs"
import { HttpClient, HttpHeaders,HttpParams,HttpResponse   } from "@angular/common/http"
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Promise } from "q";
import { resolve } from "url";

@Injectable()
export class VirtualVideoSlotBookingService {

    private messageSource = new BehaviorSubject<any>(1);
    currentMessage = this.messageSource.asObservable();
    private API_URL : any= environment.API_URL;
    constructor(private http: HttpClient) {

    }
    saveVirtualSlotDetails(data)
    {
        return this.http.post(this.API_URL + 'VirtualSlotBooking/BookVirtualSlot/',data)
        .pipe(
            tap(status => console.log("status: " + status)),
            catchError(this.handleError)
        );
    }
    getVirtualVideoCategories(): Observable<any> {
        return this.http.get<any>(this.API_URL + "VirtualVideoCategory/GetVirtualVideoCategories/")
        .pipe(
            tap(status => console.log("status: " + status)),
            catchError(this.handleError)
        );
    }
    getServicePackage(serviceID): Observable<any> {
        return this.http.get<any>(this.API_URL + "Package/GetUserPackageList/"+serviceID)
        .pipe(
            tap(status => console.log("status: " + status)),
            catchError(this.handleError)
        );
    }
    getAstrologyAmount(astrologyID): Observable<any> {
        return this.http.get<any>(this.API_URL + "AstrologyCategories/GetAstrologyAmount/"+ astrologyID)
        .pipe(
            tap(status => console.log("status: " + status)),
            catchError(this.handleError)
        );
    }
    getPackagePrice(data): Observable<any>
      {
      return this.http.post<any>(this.API_URL + 'Package/GetPackagePrice/',data)
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
