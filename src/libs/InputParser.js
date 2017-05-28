import moment from 'moment';
import Task from '@/libs/Task';

const InputParser = () => {};

InputParser.prototype.parse = (input) => {
  let action = null;
  let task = null;

  if (input.includes('add ')) {
    const taskname = input.replace('add ', '');
    task = new Task(taskname, {
      start: {
        dateTime: moment().add(1, 'minutes').format() },
      end: {
        dateTime: moment().add(1, 'hours').format() },
    });
    action = 'add';
  }
  return { action, task };
};

export default InputParser;
