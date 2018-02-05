import Task from '@/libs/Task';
import gaHelper from '@/libs/gaHelper/index';
import store from '@/store';

const Commander = () => {};
Commander.prototype.execute = ({ action, task }) => {
  switch (action) {
    case 'insert': {
      return store.dispatch('events/retrieve')
      .then(() => {
        const currentEvent = store.getters['events/getCurrent'];

        const updatePromises = [
          gaHelper.events.insert('primary', new Task(task)),
        ];

        if (currentEvent) {
          updatePromises.push(
            gaHelper.events.update(
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
      return store.dispatch('events/retrieve')
      .then(() => {
        const concerningEvent = store.getters['events/getCurrent'] || store.getters['events/getClosestPast'];

        if (!concerningEvent) return Promise.resolve();

        return gaHelper.events.update(
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
      return store.dispatch('events/retrieve')
      .then(() => {
        if (store.getters['events/getCurrent']) return Promise.resolve();

        // Get closest or last night task
        const concerningEvent = store.getters['events/getClosestPast'] || store.state.events[-1].slice(-1)[0];

        if (!concerningEvent) return Promise.resolve();

        return gaHelper.events.insert('primary', new Task(concerningEvent.summary || concerningEvent.title));
      });
    }
    case 'remove': {
      return gaHelper.events.remove('primary', task);
    }
    default: return false;
  }
};

export default Commander;
