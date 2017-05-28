import gaHelper from '@/libs/gaHelper/index';

const Commander = () => {};
Commander.prototype.execute = ({ action, task }) => {
  switch (action) {
    case 'insert': {
      return gaHelper.events.insert('primary', task);
    }
    case 'update': {
      return gaHelper.events.update('primary', task);
    }
    case 'remove': {
      return gaHelper.events.remove('primary', task);
    }
    default: return false;
  }
};

export default Commander;
