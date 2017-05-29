const web = {
  // Array of API discovery doc URLs for APIs used by the quickstart
  DISCOVERY_DOCS: [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
    'https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest'
  ],

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  get SCOPES() {
    return [
      'https://www.googleapis.com/auth/calendar.readonly',
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/tasks.readonly',
      'https://www.googleapis.com/auth/tasks'
    ].join(' ');
  }
};

/* eslint import/prefer-default-export: 0 */
export {
  web as config,
};
