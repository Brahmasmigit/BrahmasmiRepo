import { Injectable } from "@angular/core"
//import { dataContext} from "../shared/services/datacontext.service"
import { Observable, BehaviorSubject, throwError  } from "rxjs"
import { HttpClient, HttpHeaders,HttpParams,HttpResponse   } from "@angular/common/http"
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Promise } from "q";
import { resolve } from "url";

@Injectable()
export class ProductMasterService {

    private messageSource = new BehaviorSubject<any>(1);
    currentMessage = this.messageSource.asObservable();
    private API_URL : any= environment.API_URL;
    constructor(private http: HttpClient) {

    }
    SaveProduct(product)
    {
        return this.http.post(this.API_URL + 'Product/SaveProduct/',product)
        .pipe(
            tap(status => console.log("status: " + status)),
            catchError(this.handleError)
        );
    }
    getProducts(): Observable<any> {
        return this.http.get<any>(this.API_URL + "product/GetProducts/")
        .pipe(
            tap(status => console.log("status: " + status)),
            catchError(this.handleError)
        );
    }
    getItemCategories(): Observable<any> {
        return this.http.get<any>(this.API_URL + "product/GetItemCategories/")
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
