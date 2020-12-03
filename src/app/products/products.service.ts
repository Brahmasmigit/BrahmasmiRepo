
import { Injectable } from "@angular/core"
//import { dataContext} from "../shared/services/datacontext.service"
import { Observable, BehaviorSubject, throwError  } from "rxjs"
import { HttpClient, HttpHeaders,HttpParams,HttpResponse   } from "@angular/common/http"
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Promise } from "q";
import { resolve } from "url";

@Injectable()
export class ProductService {

    private messageSource = new BehaviorSubject<any>(1);
    currentMessage = this.messageSource.asObservable();
    private API_URL : any= environment.API_URL;
    constructor(private http: HttpClient) {

    }
    getAllProducts(params): Observable<any> {
        return this.http.post<any>(this.API_URL + "Product/GetAllProducts/" , params)
        .pipe(
            tap(status => console.log("status: " + status)),
            catchError(this.handleError)
        );
    }
    getAllProductsByCity(cityid): Observable<any> {
      return this.http.get<any>(this.API_URL + "Product/GetAllProductsByCity/" + cityid)
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
