import moment from 'moment';
import gaHelper from '@/libs/gaHelper/index';

const Commander = () => {};
Commander.prototype.execute = ({ action, task }) => {
  switch (action) {
    case 'add': {
      const eventEntry = {
        start: {
          dateTime: moment().add(1, 'minutes').format() },
        end: {
          dateTime: moment().add(1, 'hours').format() },
        summary: task.name
      };
      gaHelper.addEvent(eventEntry);
      return true;
    }
    default: return false;
  }
};

export default Commander;
