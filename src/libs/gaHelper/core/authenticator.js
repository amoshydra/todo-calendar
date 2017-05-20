export default {
  getToken() {
    try {
      /* eslint global-require: 0 */
      return require('@/secrets/keys');
    } catch (error) {
      throw new Error(`
  'config/keys.js' is not properly configured.
  Please check the instruction and update your key in 'config/secrets/keys.js'
`);
    }
  }
};
