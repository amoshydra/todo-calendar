import Time from 'time-chainer';
import { ExecutionContext, CommandDetail } from '..';
import { add } from '~/data-stores/events';

export default async (context: ExecutionContext, detail: CommandDetail) => {
  const now = new Date();
  const later = new Date(now.valueOf() + Time.hours(1));
  const calendarId = 'primary';

  const [ intersectionEvents, createdEvent ] = await Promise.all([
    context.service.events.list({
      calendarId,
      start: now,
      end: later,
    }),
    context.service.events.insert({
      calendarId,
      resource: {
        summary: detail.input,
        start: {
          dateTime: now.toISOString(),
        },
        end: {
          dateTime: later.toISOString(),
        }
      }
    })
  ]);

  const createdEventStart = createdEvent.start && createdEvent.start.dateTime;
  if (!createdEventStart) { return; }
  const createdEventStartValue = Date.parse(createdEventStart);

  const updatePromises = intersectionEvents
    .filter(event => event.status !== 'cancelled')
    .filter(event => event.id !== createdEvent.id)
    .filter((event) => {
      const start = event.start && event.start.dateTime;
      const end = event.end && event.end.dateTime;
      if (!start || !end) { return false; }

      return (
        // Created Event start value lie between the event start and end
        Date.parse(start) < createdEventStartValue &&
        Date.parse(end) >= createdEventStartValue
      );
    })
    .map(event => context.service.events.update({
      calendarId,
      eventId: event.id as string,
      resource: {
        end: {
          dateTime: new Date(createdEventStartValue - Time.minutes(1)).toISOString()
        }
      }
    })
    )
  ;
  const updatedEvents = await Promise.all(updatePromises);

  add([
    ...updatedEvents,
    createdEvent,
  ]);
};
