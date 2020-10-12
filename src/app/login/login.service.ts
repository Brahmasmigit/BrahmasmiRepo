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

    sendOTPToUser(contact)
    {
        return this.http.post(this.API_URL + 'Login/SendOTP',contact)
        .pipe(
            tap(status => console.log("status: " + status)),
            catchError(this.handleError)
        );
    }
    getUser(mobileNumber): Observable<any> {
      return this.http.get<any>(this.API_URL + "Login/UserExist/" + mobileNumber)
      .pipe(
          tap(Userstatus => console.log("Userstatus: " + Userstatus)),
          catchError(this.handleError)
      );
  }
  getVendorData(mobileNumber): Observable<any> {
      return this.http.get<any>(this.API_URL + "Login/VendorExist/" + mobileNumber)
      .pipe(
          tap(Vendorstatus => console.log("Vendorstatus: " + Vendorstatus)),
          catchError(this.handleError)
      );
  }
  SaveUserData(user): Observable<any>
  {
      return this.http.post<any>(this.API_URL + 'User/RegisterUser',user)
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
