type DateString = string;
type URLString = string;

export namespace Google {
  export namespace Calendar {
    export interface User {
      displayName?: string
      email?: string
      id?: string
      self?: boolean
    }

    type DateTime = {
      dateTime: string
      timeZone?: string
    } | {
      date: string
      timeZone?: string
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

    export interface EventWritableBody {
      summary?: string
      location?: string
      description?: string
      start: DateTime,
      end: DateTime,
      recurrence?: string[],
      attendees?: User[]
      status?: 'confirmed' | 'tentative' | 'cancelled'
      transparency?: 'opaque' | 'transparent'
      reminders?: {
        useDefault?: boolean,
        overrides?: { method: 'string', minutes: number }[],
      },
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
}
