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
      this.gapi = window.gapi;
      this.gapi.load('client:auth2', initClient);
    }

    function initClient() {
      this.gapi.client.init({
        clientId,
        discoveryDocs: config.DISCOVERY_DOCS,
        scope: config.SCOPES
      }).then(() => {
        // Listen for sign-in state changes.
        this.gapi.auth2.getAuthInstance().isSignedIn.listen(signInCallback);

        // Handle the initial sign-in state.
        signInCallback(this.gapi.auth2.getAuthInstance().isSignedIn.get());
      });
    }

    // Expose the on load function so that Google API can access it
    window.gaHelperOnLoad = gaHelperOnLoad;

    // Load gapi script
    const gapiScriptLink = $('<script />', {
      async: '',
      defer: '',
      src: 'https://apis.google.com/js/api.js',
      onload: 'this.onload=function(){};gaHelperOnLoad()',
      onreadystatechange: 'if (this.readyState === \'complete\') this.onload()',
    });
    $('body').append(gapiScriptLink);
  },

  signIn() {
    this.gapi.auth2.getAuthInstance().signIn();
  },

  signOut() {
    this.gapi.auth2.getAuthInstance().signOut();
  }
};

export default gaHelper;
