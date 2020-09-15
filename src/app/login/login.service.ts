import { Injectable } from "@angular/core"
//import { dataContext} from "../shared/services/datacontext.service"
import { Observable, BehaviorSubject, throwError  } from "rxjs"
import { HttpClient, HttpHeaders,HttpParams,HttpResponse   } from "@angular/common/http"
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment'


@Injectable()
export class LoginService {

    private messageSource = new BehaviorSubject<any>(1);
    currentMessage = this.messageSource.asObservable();
    private API_URL : any= environment.API_URL;
    constructor(private http: HttpClient) {

    }

    getLoginDetails(mobileNumber): Observable<any> {
        return this.http.get<any>(this.API_URL + "login/" + mobileNumber)
        .pipe(
            tap(status => console.log("status: " + status)),
            catchError(this.handleError)
        );
    }
    RegisterUser(register)
    {
        return this.http.post(this.API_URL + 'login/Register',register)
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
