import Task from '@/libs/Task';
import calendar from '@/libs/calendar';

const Commander = ({ store }) => {
  this.store = store;
};

Commander.prototype.execute = ({ action, task }) => {
  switch (action) {
    case 'insert': {
      return this.store.dispatch('calendar/list')
      .then(() => {
        const currentEvent = this.store.getters['calendar/getCurrent'];

        const updatePromises = [
          calendar.insert('primary', new Task(task)),
        ];

        if (currentEvent) {
          updatePromises.push(
            calendar.update(
              'primary',
              currentEvent.id,
              {
                ...currentEvent,
                end: {
                  dateTime: new Date().toISOString(),
                }
              }
            )
          );
        }

        return Promise.all(updatePromises);
      });
    }
    case 'break': {
      return this.store.dispatch('calendar/list')
      .then(() => {
        const concerningEvent = this.store.getters['calendar/getCurrent'] || this.store.getters['calendar/getClosestPast'];

        if (!concerningEvent) return Promise.resolve();

        return calendar.update(
          'primary',
          concerningEvent.id,
          {
            ...concerningEvent,
            end: {
              dateTime: new Date().toISOString(),
            }
          }
        );
      });
    }
    case 'resume': {
      return this.store.dispatch('calendar/list')
        .then(() => {
          if (this.store.getters['calendar/getCurrent']) return Promise.resolve();

          // Get closest or last night task
          const concerningEvent = this.store.getters['calendar/getClosestPast'] || this.store.state.events[-1].slice(-1)[0];

          if (!concerningEvent) return Promise.resolve();

          return calendar.insert('primary', new Task(concerningEvent.summary || concerningEvent.title));
        });
    }
    case 'remove': {
      return calendar.remove('primary', task);
    }
    default: return false;
  }
};

export default Commander;
