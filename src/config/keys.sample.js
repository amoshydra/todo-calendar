/**
 * Sample config file
 *
 * Step 1:
 *   Make a copy of this file and name it as "keys.js" in the same folder
 *
 * Step 2:
 *   Get your google api key here:
 *   https://developers.google.com/identity/sign-in/web/devconsole-project
 *
 * Step 3:
 *   Enable Google Calendar API in the developers console
 *   https://console.developers.google.com/
 *
 * Step 4:
 *   Create credentials with these settings,
 *    - Google Calendar API
 *    - Web browser (Javascript)
 *    - User data
 *
 * Step 5:
 *   Download your credential and fill in the detail below
 */

const web = {
  client_id: '123456789012-a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6.apps.googleusercontent.com',
  project_id: 'your-app-name-123456',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://accounts.google.com/o/oauth2/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_secret: 'ABCdcfGHIjklMNOpqrSQUvw',
  javascript_origins: ['http://localhost:8080']
};

/* eslint import/prefer-default-export: 0 */
export {
  web as google,
};
