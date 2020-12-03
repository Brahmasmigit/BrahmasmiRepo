import { Injectable } from "@angular/core"
//import { dataContext} from "../shared/services/datacontext.service"
import { Observable, BehaviorSubject, throwError  } from "rxjs"
import { HttpClient, HttpHeaders,HttpParams,HttpResponse   } from "@angular/common/http"
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Promise } from "q";
import { resolve } from "url";

@Injectable()
export class AdminServiceDetailsService {

    private messageSource = new BehaviorSubject<any>(1);
    currentMessage = this.messageSource.asObservable();
    private API_URL : any= environment.API_URL;
    constructor(private http: HttpClient) {

    }
    SaveService(service)
    {
        return this.http.post(this.API_URL + 'Service/SaveService/',service)
        .pipe(
            tap(status => console.log("status: " + status)),
            catchError(this.handleError)
        );
    }
    getServiceTypes(): Observable<any> {
        return this.http.get<any>(this.API_URL + "ServiceType/GetAllServiceTypes/")
        .pipe(
            tap(status => console.log("status: " + status)),
            catchError(this.handleError)
        );
    }
    getServiceTypeCity(servicetypeid): Observable<any> {
        return this.http.get<any>(this.API_URL + "Service/GetServiceTypeCity/"+servicetypeid)
        .pipe(
            tap(status => console.log("status: " + status)),
            catchError(this.handleError)
        );
    }
    DeleteService(servicemodel)
    {
        return this.http.post(this.API_URL + 'Service/DeleteService/',servicemodel)
        .pipe(
            tap(status => console.log("status: " + status)),
            catchError(this.handleError)
        );
    }
    getService(): Observable<any> {
        return this.http.get<any>(this.API_URL + "Service/GetAllServices/")
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
