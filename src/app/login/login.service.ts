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
//     getUser(userdata): Observable<any> {
//       return this.http.post(this.API_URL + "Login/UserExist/" , userdata)
//       .pipe(
//           tap(Userstatus => console.log("Userstatus: " + Userstatus)),
//           catchError(this.handleError)
//       );
//   }
//   getVendorData(vendordata): Observable<any> {
//       return this.http.post<any>(this.API_URL + "Login/VendorExist/" ,vendordata)
//       .pipe(
//           tap(Vendorstatus => console.log("Vendorstatus: " + Vendorstatus)),
//           catchError(this.handleError)
//       );
//   }
getUser(user): Observable<any>
{
    return this.http.post<any>(this.API_URL + 'Login/UserExist',user)
    .pipe(
        tap(status => console.log("status: " + status)),
        catchError(this.handleError)
    );
}
getVendorData(vendordata): Observable<any>
{
    return this.http.post<any>(this.API_URL + 'Login/VendorExist',vendordata)
    .pipe(
        tap(status => console.log("status: " + status)),
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
  getStoreData(storedata): Observable<any> {
    return this.http.post<any>(this.API_URL + "Login/StoreExist/" ,storedata)
    .pipe(
        tap(Storestatus => console.log("Storestatus: " + Storestatus)),
        catchError(this.handleError)
    );
  }
    private handleError(error: any) {
        console.error(error);
        return throwError(error);
    }
}
