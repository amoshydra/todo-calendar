import { Google } from '~/domain/google/class/calendar';

export class CalendarEventsAPI {
  private service: typeof gapi;

  constructor(googleApiClient: typeof gapi) {
    this.service = googleApiClient;
  }

  async list({
    calendarId = 'primary',
    start,
    end,
  }: {
    calendarId?: string
    start: Date
    end: Date
  }) {
    const { result } = await this.service.client.calendar.events.list({
      calendarId,
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      showDeleted: true,
      singleEvents: true,
      orderBy: 'startTime',
    });

    return (result.items as gapi.client.calendar.Event[])
      .filter(event => event.start && event.start.dateTime) // Exclude all-day event
      .filter(event => event.creator && event.creator.self) // Exclude event not created by myself
    ;
  }

  async insert({
    calendarId = 'primary',
    resource,
  }: {
    calendarId?: string
    resource: Google.Calendar.EventWritableBody,
  }) {
    const { result } = await this.service.client.calendar.events.insert(
      ({
        calendarId,
        resource,
      } as any)
    );
    return result;
  }

  async update({
    calendarId = 'primary',
    eventId,
    resource,
  }: {
    calendarId: string,
    eventId: string,
    resource: Partial<Google.Calendar.EventWritableBody>,
  }) {
    const { result } = await this.service.client.calendar.events.patch((
      {
        calendarId,
        eventId,
        resource,
      } as any)
    );
    return result;
  }

  remove({
    calendarId = 'primary',
    eventId,
  }: {
    calendarId: string,
    eventId: string,
  }) {
    return this.service.client.calendar.events.delete({
      calendarId,
      eventId,
    });
  }
}
