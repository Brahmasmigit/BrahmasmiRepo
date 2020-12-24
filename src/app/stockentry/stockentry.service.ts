import { Injectable } from "@angular/core"
import { Observable, BehaviorSubject, throwError  } from "rxjs"
import { HttpClient, HttpHeaders,HttpParams,HttpResponse   } from "@angular/common/http"
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable()
export class StockEntryService {

    private messageSource = new BehaviorSubject<any>(1);
    currentMessage = this.messageSource.asObservable();
    private API_URL : any= environment.API_URL;
    constructor(private http: HttpClient) {

    }
    StockEntry(stock)
    {
        return this.http.post(this.API_URL + 'StoreStock/StockEntry',stock)
        .pipe(
            tap(status => console.log("status: " + status)),
            catchError(this.handleError)
        );
    }
    getStockDetails(storeid): Observable<any> {
      return this.http.get<any>(this.API_URL + "StoreStock/GetStockDetails/" + storeid)
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