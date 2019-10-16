import { CommandDetail } from './command-executor';

const makeWordRegex = (array: string[]) => {
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

const mapAction = (input: string) => {
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

export class InputParser {
  parse(rawInput: string): CommandDetail | null {
    const input = rawInput.trim();

    const action = mapAction(input.toLowerCase());

    if (!action) { return null; }

    return { action, input };
  }
}
