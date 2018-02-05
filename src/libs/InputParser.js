import Task from '@/libs/Task';

const SHOULD_MAKE_TASK_REGEX = /insert/;

const InputParser = () => {};

const makeWordRegex = (array) => {
  const delimeteredWords = array.join('|');
  return new RegExp(`^(${delimeteredWords})$`);
};

const wordMapper = {
  break: makeWordRegex([
    'stop',
    'pause',
    'halt',
    'break',
  ]),
  join: makeWordRegex([
    'join',
    'continue',
    'resume',
  ]),
  push: makeWordRegex([
    'push',
  ]),
};

const mapAction = (input) => {
  switch (true) {
    case wordMapper.break.test(input):
      return 'break';
    case wordMapper.join.test(input):
      return 'join';
    case wordMapper.push.test(input):
      return 'push';
    case input.length > 0:
      return 'insert';
    default:
      return null;
  }
};

InputParser.prototype.parse = (rawInput) => {
  const input = rawInput.trim();

  const action = mapAction(input);
  const task = SHOULD_MAKE_TASK_REGEX.test(action) ? new Task(input) : null;

  return { action, task };
};

export default InputParser;
