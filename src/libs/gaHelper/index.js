/**
 * Google Authentication Helper (gaHelper)
 */
import core from './core';
import { config } from './config';

const gaHelper = {
  init(callback) {
    const clientId = core.getToken().google.client_id;

    function gaHelperOnLoad() {
      const gapi = window.gapi;
      gapi.load('client:auth2', initClient);
    }

    function initClient() {
      const gapi = window.gapi;
      gapi.client.init({
        clientId,
        discoveryDocs: config.DISCOVERY_DOCS,
        scope: config.SCOPES
      }).then(() => {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(callback);

        // Handle the initial sign-in state.
        callback(gapi.auth2.getAuthInstance().isSignedIn.get());
      });
    }

    // Expose the on load function so that Google API can access it
    window.gaHelperOnLoad = gaHelperOnLoad;

    // Load gapi script
    const gapiScriptLink = document.createElement('script');
    gapiScriptLink.setAttribute('async', '');
    gapiScriptLink.setAttribute('defer', '');
    gapiScriptLink.setAttribute('src', 'https://apis.google.com/js/api.js');
    gapiScriptLink.setAttribute('onload', 'this.onload=function(){};gaHelperOnLoad()');
    gapiScriptLink.setAttribute('onreadystatechange', 'if (this.readyState === \'complete\') this.onload()');

    document.body.appendChild(gapiScriptLink);
  }
};

export default gaHelper;
