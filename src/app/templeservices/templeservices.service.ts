import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { TempleWithType } from '../admin/admintempleservices/templeservice.model';

@Injectable({
  providedIn: 'root'
})
export class TempleservicesService {

  private API_URL: any = environment.API_URL;

  constructor(private http: HttpClient) { }

  GetTemplesTypesList(): Observable<TempleWithType[]> {
    return this.http.get<TempleWithType[]>(this.API_URL + "TempleServices/GetTemplesWithTypesList/")
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