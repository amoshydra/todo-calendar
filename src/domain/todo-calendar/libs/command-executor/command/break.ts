import Time from 'time-chainer';
import { ExecutionContext } from '..';
import { add } from '~/data-stores/events';

export default async (context: ExecutionContext) => {
  const now = new Date();
  const rightBeforeNow = new Date(now.valueOf() - Time.seconds(1));
  const calendarId = 'primary';

  const intersectionEvents = await context.service.events.list({
    calendarId,
    start: rightBeforeNow,
    end: now,
    showDeleted: false,
  });

  return Promise.all(
    intersectionEvents
      .map(event => context.service.events.update({
        calendarId,
        eventId: event.id as string,
        resource: {
          end: {
            dateTime: now.toISOString()
          }
        }
      }))
      .map(promise => promise.then(add))
  );
};
