import { Injectable,EventEmitter } from "@angular/core"
import { Observable, BehaviorSubject, throwError,Subscription, Subject  } from "rxjs"
import { HttpClient, HttpHeaders,HttpParams,HttpResponse   } from "@angular/common/http"
import { catchError, tap, map , filter} from 'rxjs/operators';
import { environment } from '../../../environments/environment'
import {EventModel} from '../models/eventmodel'

@Injectable()
export class EventListenerService {

    private messageSource = new BehaviorSubject<any>(1);
    currentMessage = this.messageSource.asObservable();
    private API_URL : any= environment.API_URL;
    constructor(private http: HttpClient) {

    }

    /*eventChange: EventEmitter<EventModel> = new EventEmitter<EventModel>();

    public emitEventdata(message: string) {
        this.eventChange.emit({message: message, eventId: 42});
    }*/
    private queue = new Subject<EventModel>();
    //This method is used to publish the data/object by providing a unique KEY to the event property.
    addToEventBus(event: string, payload: any) {        
        this.queue.next(new EventModel(event, payload));
    }

    //This method is used to retrieve the data/object by the subscribers based on the KEY.
    on(event: string, action: any): Subscription {
        return this.queue.pipe(
            filter((e: EventModel) => e.event === event),
            map((e: EventModel) => e.payload)
        ).subscribe(action);
    }
}
