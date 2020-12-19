import { Injectable } from "@angular/core"
import { BehaviorSubject, throwError  } from "rxjs"
import { HttpClient   } from "@angular/common/http"
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment'


@Injectable()
export class ContactUsService {

    private messageSource = new BehaviorSubject<any>(1);
    currentMessage = this.messageSource.asObservable();
    private API_URL : any= environment.API_URL;
    constructor(private http: HttpClient) {

    }

    contactToWebsite(contact)
    {
        return this.http.post(this.API_URL + 'ContactUs/ContactToWebsite/',contact)
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