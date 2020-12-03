import { Injectable } from "@angular/core"
import { Observable, BehaviorSubject, throwError } from "rxjs"
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http"
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ServicesTimings, Temple, TempleServiceAdmin, TempleType } from './templeservice.model';


@Injectable()
export class TempleService {

    private messageSource = new BehaviorSubject<any>(1);
    currentMessage = this.messageSource.asObservable();
    private API_URL: any = environment.API_URL;

    constructor(private http: HttpClient) {

    }

    SaveTemple(templeData: TempleServiceAdmin) {
        return this.http.post(this.API_URL + 'TempleServices/RegisterTemple/', templeData)
            .pipe(
                tap(status => console.log("status: " + status)),
                catchError(this.handleError)
            );
    }

    GetTemples(templeId: number): Observable<Temple[]> {
        return this.http.get<Temple[]>(this.API_URL + "TempleServices/GetTempleData/" + templeId)
            .pipe(
                tap(),
                catchError(this.handleError)
            );
    }

    GetTempleTypes(): Observable<TempleType[]> {
        return this.http.get<TempleType[]>(this.API_URL + "TempleServices/GetTempleTypes/")
            .pipe(
                tap(),
                catchError(this.handleError)
            );
    }

    GetServicesTimings(templeId: number): Observable<ServicesTimings[]> {
        return this.http.get<ServicesTimings[]>(this.API_URL + "TempleServices/GetAllServicesTimings/" + templeId)
            .pipe(
                tap(),
                catchError(this.handleError)
            );
    }

    DeleteTemple(data: Temple) {
        return this.http.post(this.API_URL + 'TempleServices/DeleteTemple/', data)
            .pipe(
                tap(),
                catchError(this.handleError)
            );
    }

    GetTempleDetailedData(tmpId: number): Observable<any> {
        return this.http.get<any>(this.API_URL + "TempleServices/GetAllTemples/")
            .pipe(
                tap(),
                catchError(this.handleError)
            );
    }

    private handleError(error: any) {
        console.error(error);
        return throwError(error);
    }
}