export default {
  apiKey: process.env.GOOGLE_API_KEY as string,
  clientId: process.env.GOOGLE_CLIENT_ID as string,
  // Array of API discovery doc URLs for APIs used by the quickstart
  discoveryDocs: [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
    'https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest'
  ],
  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  scope: [
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/tasks.readonly',
    'https://www.googleapis.com/auth/tasks'
  ],
};
