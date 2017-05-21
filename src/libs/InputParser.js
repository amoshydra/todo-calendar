const InputParser = () => {};

InputParser.prototype.parse = (input) => {
  let action = null;
  let task = null;

  if (input.includes('add ')) {
    task = { name: input.replace('add ', '') };
    action = 'add';
  }
  return { action, task };
};

export default InputParser;
