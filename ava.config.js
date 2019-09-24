export default {
  require: [
    './test/ava.setup.js',
  ],
  sources: ['**/*.{js,vue,ts}'],
  files: ['test/specs/**/*'],
  extensions: [
    'ts',
  ],
  babel: false,
  compileEnhancements: false,
  tap: true,
  verbose: true,
};
