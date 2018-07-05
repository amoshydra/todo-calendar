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
  extend: makeWordRegex([
    'extend',
  ]),
  resume: makeWordRegex([
    'resume',
    'continue',
    'copy',
    'dup',
    'clone',
  ]),
  push: makeWordRegex([
    'push',
  ]),
};

const mapAction = (input) => {
  switch (true) {
    case wordMapper.break.test(input): return 'break';
    case wordMapper.extend.test(input): return 'break';

    case wordMapper.resume.test(input): return 'resume';

    case wordMapper.push.test(input): return 'push';

    // Insert if a valid input doesn't match any command
    case input.length > 0: return 'insert';
    default: return null;
  }
};

InputParser.prototype.parse = (rawInput) => {
  const input = rawInput.trim();

  const action = mapAction(input.toLowerCase());
  const task = input;

  return { action, task };
};

export default InputParser;
