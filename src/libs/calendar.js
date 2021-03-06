import moment from 'moment';
import googleApi from '@/plugins/google-api/main';

const DAY_IN_HOUR = 24;

const getZeroedDay = (offset) => {
  const date = moment();
  date.set({
    hour: offset * DAY_IN_HOUR,
    minute: 0,
    second: 0,
    millisecond: 0,
  });
  return date;
};

// /**
//  *
//  * @param {Number} startOffset 0 today, -1 yesterday, 1 tomorrow
//  * @param {Number} endOffset exclusive
//  * @return {Object} containing startDate and endDate
//  */
// const getDayRange = (startOffset = 0, endOffset = 1) => ({
//   start: getZeroedDay(startOffset),
//   end: getZeroedDay(endOffset),
// });

export default {

  /**
   * List all the calendar event. Accept an optional options object to
   * specify the calendarId and min max range.
   *
   * @param {object} options
   * @param {string} [options.calendarId=primary]
   * @param {number} [options.startOffset=0]
   * @param {number} [options.endOffset=1]
   * @return {Events} events
   */
  async list(options = {}) {
    // Initialize options
    const calendarId = options.calendarId || 'primary';
    const startOffset =(options.startOffset != null) ? options.startOffset : 0;
    const endOffset =(options.endOffset != null) ? options.endOffset : 1;

    // Start fetching
    const start = options.start || getZeroedDay(startOffset);
    const end = options.end || getZeroedDay(endOffset);
    const { result } = await googleApi(gapi => gapi.client.calendar.events.list({
      calendarId,
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      showDeleted: false,
      singleEvents: true,
      orderBy: 'startTime',
    }));

    // Filter
    const events = result.items
      .filter(event => !!event.start.dateTime) // Exclude all-day event
      .filter(event => !!event.creator.self) // Exclude event not created by myself
      ;

    // Return
    return events;
  },

  insert(calendarId, resource) {
    return googleApi(gapi => gapi.client.calendar.events.insert({
      calendarId,
      resource,
    }));
  },
  update(calendarId, eventId, resource) {
    return googleApi(gapi => gapi.client.calendar.events.update({
      calendarId,
      eventId,
      resource,
    }));
  },
  remove(calendarId, eventId) {
    return googleApi(gapi => gapi.client.calendar.events.delete({
      calendarId,
      eventId,
    }));
  },
};
