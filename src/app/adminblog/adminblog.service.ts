import { Injectable } from "@angular/core"
import { Observable, BehaviorSubject, throwError  } from "rxjs"
import { HttpClient, HttpHeaders,HttpParams,HttpResponse   } from "@angular/common/http"
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Promise } from "q";
import { resolve } from "url";

@Injectable()
export class AdminBlogService {

    private messageSource = new BehaviorSubject<any>(1);
    currentMessage = this.messageSource.asObservable();
    private API_URL : any= environment.API_URL;
    constructor(private http: HttpClient) {

    }
    SaveBlog(data)
    {
        return this.http.post(this.API_URL + 'Blog/SaveBlog/',data)
        .pipe(
            tap(status => console.log("status: " + status)),
            catchError(this.handleError)
        );
    }
    getBlogDetails(blogID): Observable<any> {
        return this.http.get<any>(this.API_URL + "Blog/GetBlogDetails/"+blogID)
        .pipe(
            tap(status => console.log("status: " + status)),
            catchError(this.handleError)
        );
    }
    DeleteBlog(blog)
    {
        return this.http.post(this.API_URL + 'Blog/DeleteBlog/',blog)
        .pipe(
            tap(status => console.log("status: " + status)),
            catchError(this.handleError)
        );
    }
    
    getBlog(): Observable<any> {
        return this.http.get<any>(this.API_URL + "Blog/GetAllBlogs/")
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
