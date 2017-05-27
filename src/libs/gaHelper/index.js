/**
 * Google Authentication Helper (gaHelper)
 */
import $ from 'jquery';
import core from './core/authenticator';
import { config } from './config';

const gaHelper = {
  gapi: null,

  init(signInCallback) {
    const clientId = core.getToken().google.client_id;

    function gaHelperOnLoad() {
      gaHelper.gapi = window.gapi;
      gaHelper.gapi.load('client:auth2', initClient);
    }

    function initClient() {
      gaHelper.gapi.client.init({
        clientId,
        discoveryDocs: config.DISCOVERY_DOCS,
        scope: config.SCOPES
      }).then(() => {
        // Listen for sign-in state changes.
        gaHelper.gapi.auth2.getAuthInstance().isSignedIn.listen(signInCallback);

        // Handle the initial sign-in state.
        signInCallback(gaHelper.gapi.auth2.getAuthInstance().isSignedIn.get());
      });
    }

    // Load gapi script
    $.ajax({
      url: 'https://apis.google.com/js/api.js',
      dataType: 'script',
      success: gaHelperOnLoad
    });
  },

  auth: {
    signIn() {
      gaHelper.gapi.auth2.getAuthInstance().signIn();
    },
    signOut() {
      gaHelper.gapi.auth2.getAuthInstance().signOut();
    },
  },
  tasks: {
  },
  events: {
    list(calendarId) {
      return gaHelper.gapi.client.calendar.events.list({
        calendarId,
        timeMin: (new Date()).toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime'
      }).then(response => response.result.items);
    },
    insert(calendarId, event) {
      return gaHelper.gapi.client.calendar.events.insert({
        calendarId,
        resource: event,
      });
    },
    update(calendarId, eventId, event) {
      return gaHelper.gapi.client.calendar.events.update({
        calendarId,
        eventId,
        resource: event,
      });
    },
    delete(calendarId, eventId, event) {
      return gaHelper.gapi.client.calendar.events.update({
        calendarId,
        eventId,
      });
    }
  }
};

export default gaHelper;
