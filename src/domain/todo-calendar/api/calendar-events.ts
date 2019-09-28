export class CalendarEventsAPI {
  private service: typeof gapi;

  constructor(googleApiClient: typeof gapi) {
    this.service = googleApiClient;
  }

  async list({
    calendarId,
    start,
    end,
  }: {
    calendarId: string
    start: Date
    end: Date
  }) {
    const response = await this.service.client.calendar.events.list({
      calendarId: calendarId,
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      showDeleted: false,
      singleEvents: true,
      orderBy: 'startTime',
    });
    return response.result.items;
  }
}
