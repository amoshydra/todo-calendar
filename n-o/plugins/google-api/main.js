import { getGAPI } from './core';
import config from './config';

const gapiPromise = getGAPI()
  .then((gapi) => new Promise((resolve) => {
    gapi.load(
      'client:auth2',
      () => gapi.client.init({
        apiKey: process.env.GOOGLE_API_KEY,
        clientId: process.env.GOOGLE_CLIENT_ID,
        discoveryDocs: config.DISCOVERY_DOCS,
        scope: config.SCOPES.join(' '),
      })
        .then(() => resolve(window.gapi))
    )
  }));

/**
 * Export Google API library with a promise's then function.
 * Usage example:
 * ```
 * import $gapi from './';
 * 
 * $gapi((gapi) => {
 *   gapi.client.people.people.get({
 *     ...
 *   });
 * });
 * ```
 */
export default gapiPromise.then.bind(gapiPromise);
