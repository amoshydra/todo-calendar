import gaHelper from '@/libs/gaHelper/index';

const Commander = () => {};
Commander.prototype.execute = ({ action, task }) => {
  switch (action) {
    case 'add': {
      return gaHelper.events.insert('primary', task);
    }
    default: return false;
  }
};

export default Commander;
