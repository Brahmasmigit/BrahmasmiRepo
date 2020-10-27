
import { Injectable } from "@angular/core"
import { Observable, BehaviorSubject, throwError  } from "rxjs"
import { HttpClient, HttpHeaders,HttpParams,HttpResponse   } from "@angular/common/http"
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Promise } from "q";
import { resolve } from "url";

@Injectable()
export class AdminServiceTypeService {

    private messageSource = new BehaviorSubject<any>(1);
    currentMessage = this.messageSource.asObservable();
    private API_URL : any= environment.API_URL;
    constructor(private http: HttpClient) {

    }
    SaveServiceType(data)
    {
        return this.http.post(this.API_URL + 'ServiceType/SaveServiceType/',data)
        .pipe(
            tap(status => console.log("status: " + status)),
            catchError(this.handleError)
        );
    }
    DeleteServiceType(servicetype)
    {
        return this.http.post(this.API_URL + 'ServiceType/DeleteServiceType/',servicetype)
        .pipe(
            tap(status => console.log("status: " + status)),
            catchError(this.handleError)
        );
    }
    getCities(): Observable<any> {
        return this.http.get<any>(this.API_URL + "Utilities/GetAllCities/")
        .pipe(
            tap(status => console.log("status: " + status)),
            catchError(this.handleError)
        );
    }
    getServiceType(): Observable<any> {
        return this.http.get<any>(this.API_URL + "ServiceType/GetAllServiceTypes/")
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
