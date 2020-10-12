import { Injectable } from "@angular/core"
import { Observable, BehaviorSubject, throwError  } from "rxjs"
import { HttpClient, HttpHeaders,HttpParams,HttpResponse   } from "@angular/common/http"
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment'


@Injectable()
export class UtilitiesService {

    private messageSource = new BehaviorSubject<any>(1);
    currentMessage = this.messageSource.asObservable();
    private API_URL : any= environment.API_URL;
    constructor(private http: HttpClient) {

    }

    getStates(): Observable<any> {
      return this.http.get<any>(this.API_URL + "Utilities/GetStates" )
      .pipe(
          tap(status => console.log("status: " + status)),
          catchError(this.handleError)
      );
    }

    getCities(StateID): Observable<any> {
      return this.http.get<any>(this.API_URL + "Utilities/GetCity/" + StateID)
      .pipe(
          tap(status => console.log("status: " + status)),
          catchError(this.handleError)
      );
    }
    getTitle(): Observable<any> {
      return this.http.get<any>(this.API_URL + "Utilities/GetTitle" )
      .pipe(
          tap(status => console.log("status: " + status)),
          catchError(this.handleError)
      );
    }
    getCertification(): Observable<any> {
        return this.http.get<any>(this.API_URL + "Utilities/GetCertification" )
        .pipe(
            tap(status => console.log("status: " + status)),
            catchError(this.handleError)
        );
      }
    getSocialNetwork(): Observable<any> {
        return this.http.get<any>(this.API_URL + "Utilities/GetSocialNetworks" )
        .pipe(
            tap(status => console.log("status: " + status)),
            catchError(this.handleError)
        );
      }
      SavePatient(patient): Observable<any>
      {
          return this.http.post(this.API_URL + 'Utilities/SavePatient',patient)
          .pipe(
              tap(status => console.log("status: " + status)),
              catchError(this.handleError)
          );
      }
      getpatientdata(): Observable<any> {
        return this.http.get<any>(this.API_URL + "Utilities/GetPatientData" )
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
