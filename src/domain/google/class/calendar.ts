type DateString = string;
type URLString = string;

export namespace Google.Calendar {
  export interface User {
    email: string
    self: boolean
  }

  export interface DateTime {
    dateTime: string
  }

  export interface Event {
    created: DateString
    creator: User
    end: DateTime
    etag: string
    htmlLink: URLString
    iCalUID: URLString
    id: string
    kind: string // 'calendar#event'
    organizer: User
    reminders: Object
    sequence: number
    start: DateTime
    status: string
    summary: string
    updated: DateString
  }

  export class Event {
    constructor(payload: Event) {
      this.created = payload.created;
      this.creator = payload.creator;
      this.end = payload.end;
      this.etag = payload.etag;
      this.htmlLink = payload.htmlLink;
      this.iCalUID = payload.iCalUID;
      this.id = payload.id;
      this.kind = payload.kind;
      this.organizer = payload.organizer;
      this.reminders = payload.reminders;
      this.sequence = payload.sequence;
      this.start = payload.start;
      this.status = payload.status;
      this.summary = payload.summary;
      this.updated = payload.updated;
    }
  }
}
