import { reactive } from '@vue/composition-api';

type GEvent = gapi.client.calendar.Event;

interface EventsReactiveData {
  events: Record<string, GEvent>,
}

interface DateRange {
  start: Date,
  end: Date,
}

const sortEventByStartTime = (a: gapi.client.calendar.Event, b: gapi.client.calendar.Event) => (
  (new Date((a.start && a.start.dateTime) as string)).valueOf() -
  (new Date((b.start && b.start.dateTime) as string)).valueOf()
);

const filterBetweenDate = ({ start, end }: DateRange) => (event: gapi.client.calendar.Event) => {
  const startDateString = (event.start && event.start.dateTime);
  const endDateString = (event.end && event.end.dateTime);

  if (!(
    startDateString &&
    endDateString &&
    start &&
    end
  )) { return false; }

  return (
    Date.parse(startDateString) >= start.valueOf() &&
    Date.parse(endDateString) <= end.valueOf()
  );
};

export const data = reactive<EventsReactiveData>({
  events: {},
});

export const add = (eventOrEvents: GEvent | GEvent[]) => {
  const events = Array.isArray(eventOrEvents) ? eventOrEvents : [eventOrEvents];

  data.events = events.reduce((acc: EventsReactiveData['events'], event) => {
    acc[event.id as string] = event;
    return acc;
  }, {
    ...data.events,
  });
};

export const getView = ({ start, end }: DateRange) => Object.values(data.events)
  .filter(event => event.status !== 'cancelled')
  .filter(filterBetweenDate({ start, end }))
  .sort(sortEventByStartTime)
;
