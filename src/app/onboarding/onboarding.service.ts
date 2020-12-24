import { Injectable } from "@angular/core"
import { Observable, BehaviorSubject, throwError  } from "rxjs"
import { HttpClient, HttpHeaders,HttpParams,HttpResponse   } from "@angular/common/http"
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Promise } from "q";
import { resolve } from "url";

@Injectable()
export class OnBoardingService {

    private messageSource = new BehaviorSubject<any>(1);
    currentMessage = this.messageSource.asObservable();
    private API_URL : any= environment.API_URL;

    constructor(private http: HttpClient) {

    }
    getVedapatashalaOnBoarding(vedapatashalaID): Observable<any> {
        return this.http.get<any>(this.API_URL + "VedapatashalaOnBoarding/GetVedapatashalaOnBoarding/"+vedapatashalaID)
        .pipe(
            tap(status => console.log("status: " + status)),
            catchError(this.handleError)
        );
    }
    vedapatashala(onboard)
    {
      
        return this.http.post(this.API_URL + 'VedapatashalaOnBoarding/vedapatashalaonboarding/',onboard)
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