import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TempleOrderDetailsService {

  private messageSource = new BehaviorSubject<any>(1);
  currentMessage = this.messageSource.asObservable();
  private API_URL: any = environment.API_URL;
  constructor(private http: HttpClient) {
  }

  getTempleOrderDetails(invoiceno: string): Observable<any> {
    let params = new HttpParams()
      .set('invoiceno', invoiceno);
    return this.http.get<any>(this.API_URL + "TempleUserBooking/GetTempleOrderDetails", { params })
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
