import { reactive } from '@vue/composition-api';

type GEvent = gapi.client.calendar.Event;

interface EventsReactiveData {
  events: Record<string, GEvent>,
  views: Record<string, Function>,
}

export const data = reactive<EventsReactiveData>({
  events: {},
  views: {},
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

export const getView = (viewId: string, filterFunction: Function) => {
  data.views[viewId] = data.views[viewId] || filterFunction;
  const filterFn = data.views[viewId];

  return filterFn(Object.values(data.events));
};
