import Time from 'time-chainer';
import { ExecutionContext } from '..';
import { add } from '~/data-stores/events';
import breakCommand from '~/domain/todo-calendar/libs/command-executor/command/break';

export default async (context: ExecutionContext) => {
  await breakCommand(context);

  const now = new Date(Date.now() + Time.seconds(1));
  const endOfTheDay = new Date();
  endOfTheDay.setHours(23, 59, 59);
  const calendarId = 'primary';

  const [ nextEvent ] = await context.service.events.list({
    calendarId,
    start: now,
    end: endOfTheDay,
    maxResults: 1,
    showDeleted: false,
  });

  const start = nextEvent.start && nextEvent.start.dateTime;
  const end = nextEvent.end && nextEvent.end.dateTime;

  if (!(start && end)) { return; }

  const duration = Date.parse(end) - Date.parse(start);

  const updatedEvent = await context.service.events.update({
    calendarId,
    eventId: nextEvent.id as string,
    resource: {
      start: {
        dateTime: now.toISOString()
      },
      end: {
        dateTime: new Date(now.valueOf() + duration).toISOString()
      }
    }
  });

  add(updatedEvent);
};
