/**
 * Google Authentication Helper (gaHelper)
 */
import $ from 'jquery';
import core from './core';
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

  signIn: () => {
    gaHelper.gapi.auth2.getAuthInstance().signIn();
  },

  signOut: function signOut() {
    gaHelper.gapi.auth2.getAuthInstance().signOut();
  }
};

export default gaHelper;
