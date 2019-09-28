// Workaround added for https://github.com/Bolisov/google-api-typings-generator/issues/6
declare namespace gapi.client.calendar {
  const acl: gapi.client.calendar.AclResource;
  const calendarList: gapi.client.calendar.CalendarListResource;
  const calendars: gapi.client.calendar.CalendarsResource;
  const channels: gapi.client.calendar.ChannelsResource;
  const colors: gapi.client.calendar.ColorsResource;
  const events: gapi.client.calendar.EventsResource;
  const freebusy: gapi.client.calendar.FreebusyResource;
  const settings: gapi.client.calendar.SettingsResource;
}
