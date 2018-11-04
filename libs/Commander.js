import Task from '@/libs/Task';

const CASE_INSERT_FN = async (instance, task) => {
  await instance.store.dispatch('calendar/list');
  await instance.store.dispatch('calendar/insert', {
    calendarId: 'primary',
    resource: new Task(task),
  });

  const currentEvent = instance.store.getters['calendar/getCurrent'];
  if (currentEvent) {
    await instance.store.dispatch('calendar/update', {
      calendarId: 'primary',
      eventId: currentEvent.id,
      resource: {
        ...currentEvent,
        end: {
          dateTime: new Date().toISOString(),
        }
      },
    });
  }
};
const CASE_BREAK_FN = async (instance, task) => {
  await instance.store.dispatch('calendar/list');
  const concerningEvent = (
    instance.store.getters['calendar/getCurrent']
    || instance.store.getters['calendar/getClosestPast']
  );
  if (!concerningEvent) return;

  await instance.store.dispatch('calendar/update', {
    calendarId: 'primary',
    eventId: concerningEvent.id,
    resource: {
      ...concerningEvent,
      end: {
        dateTime: new Date().toISOString(),
      }
    },
  });
};
const CASE_RESUME_FN = async (instance, task) => {
  await instance.store.dispatch('calendar/list');
  if (instance.store.getters['calendar/getCurrent']) return;

  // Get closest or last night task
  const concerningEvent = (
    instance.store.getters['calendar/getClosestPast']
    || instance.store.state.events[-1].slice(-1)[0]
  );
  if (!concerningEvent) return;

  await instance.store.dispatch('calendar/insert', {
    calendarId: 'primary',
    resource: new Task(concerningEvent.summary || concerningEvent.title),
  });
};
const CASE_REMOVE_FN = async (instance, task) => {
  await instance.store.dispatch('calendar/list');

  const currentEvent = instance.store.getters['calendar/getCurrent'];
  if (!currentEvent) return;
  await instance.$store.dispatch('calendar/remove', {
    calendarId: 'primary',
    eventId: currentEvent.id,
  });
};

const Commander = function Commander({ store }) {
  this.store = store;
};
Commander.prototype.execute = function execute({ action, task }) {
  switch (action) {
    case 'insert': return CASE_INSERT_FN(this, task);
    case 'break': return CASE_BREAK_FN(this, task);
    case 'resume': return CASE_RESUME_FN(this, task);
    case 'remove': return CASE_REMOVE_FN(this, task);
    default: return false;
  }
};

export default Commander;
