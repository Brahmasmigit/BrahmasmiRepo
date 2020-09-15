export class EventModel {
    event: string;
    payload: any;

    constructor(_event: string, _payload: any) {
        this.event = _event;
        this.payload = _payload;
    }
}