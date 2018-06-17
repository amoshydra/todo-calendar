import moment from 'moment';
import googleApi from '@/plugins/google-api/main';

const DAY_IN_HOUR = 24;

const getZeroedDay = (offset) => {
  const start = moment();
  start.set({
    hour: offset * DAY_IN_HOUR,
    minute: 0,
    second: 0,
    millisecond: 0,
  });
  return start
};

/**
 * 
 * @param {Number} startOffset 0 today, -1 yesterday, 1 tomorrow
 * @param {Number} endOffset exclusive
 * @return {Object} containing startDate and endDate
 */
const getDayRange = (startOffset = 0, endOffset = 1) => {
  // Setup today's midnight Date object
  const start = getZeroedDay(startOffset * DAY_IN_HOUR)
  const end = start.clone();
  end.set('hour', endOffset * DAY_IN_HOUR);
  return {
    start,
    end,
  };
};


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
  async list (options = {}) {
    // Initialize options
    const calendarId = options.calendarId || 'primary';
    const startOffset = options.startOffset || 0;
    const endOffset = options.endOffset || 1;

    // Start fetching
    const { start, end } = getDayRange(startOffset, endOffset);
    const { result } = await googleApi(gapi =>
      gapi.client.calendar.events.list({
        calendarId: calendarId,
        timeMin: start.toISOString(),
        timeMax: end.toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: 'startTime',
      })
    );

    // Filter
    const events = result.items.filter(event =>
      !!event.start.dateTime && // Exclude all-day event
      event.creator.self // Exclude event not created by myself
    );

    // Return
    return events;
  },
};
