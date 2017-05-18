const sampleToken = require('@/config/keys.sample.js');

export default {
  isTokenValid(token) {
    /* eslint import/no-named-as-default-member: 0 */
    const validity = token.google &&
                    token.google.client_id &&
                    token.google.client_id !== sampleToken.google.client_id;
    if (!validity) {
      throw new Error('config/keys.js is not properly configure.' +
                      'Please check the instruction in config/keys.sample.js');
    }
    return token;
  },

  getToken() {
    try {
      /* eslint global-require: 0 */
      const token = require('@/config/keys.js');
      return this.isTokenValid(token);
    } catch (error) {
      throw error;
    }
  }
};
