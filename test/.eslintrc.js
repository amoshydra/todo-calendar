const config = require('../.eslintrc');

module.exports = {
  settings: {
    'import/resolver': {
      node: {},
      webpack: config.settings['import/resolver'].webpack,
    },
  }
}
