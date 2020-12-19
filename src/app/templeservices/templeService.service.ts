import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { TempleUserDashboardModel, TempleWithType } from '../admin/admintempleservices/templeservice.model';

@Injectable({
  providedIn: 'root'
})
export class TempleService {

  private API_URL: any = environment.API_URL;

  constructor(private http: HttpClient) { }

  GetTemplesTypesList(): Observable<TempleWithType[]> {
    return this.http.get<TempleWithType[]>(this.API_URL + "TempleServices/GetTemplesWithTypesList/")
      .pipe(
        tap(status => console.log("status: " + status)),
        catchError(this.handleError)
      );
  }

  // SaveUserServiceRequest(data: UserModel): Observable<any> {
  //   return this.http.post(this.API_URL + 'TempleServices/SaveUserServiceRequest/', data)
  //     .pipe(
  //       tap(status => console.log("status: " + status)),
  //       catchError(this.handleError)
  //     );
  // }

  GetTempleUserDashboard(userId: number): Observable<TempleUserDashboardModel[]> {
    return this.http.get<TempleUserDashboardModel[]>(this.API_URL + "TempleUserBooking/GetTempleUserDashboardData?userId=" + userId)
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