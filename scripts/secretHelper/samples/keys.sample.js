/**
 * <% WARNING %>
 *
 * Step 1: Obtain your client_id
 *   A Google client_id is used to identify you as developer the developer who
 *   is making the API calls. You can get your own Google client_id here:
 *   > https://developers.google.com/identity/sign-in/web/devconsole-project
 *
 * Step 2:
 *   Enable Google Calendar API in the developers console
 *   https://console.developers.google.com/
 *
 * Step 3:
 *   Create credentials with these settings,
 *    - Google Calendar API
 *    - Web browser (Javascript)
 *    - User data
 *
 * Step 4:
 *   Replace the client_id below.
 */

const secrets = {
  development: {
    /**
     * You should obtain your own client_id from Google
     * for your local development.
     *
     * You may restrict the authorised JavaScript origins
     * in the Developer Console to:
     *  - http://www.localhost:<% PORT %>
     *  - http://localhost:<% PORT %>
     */
    client_id: '123456789012-a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6.apps.googleusercontent.com',
  },
  production: {
    /**
     * This section is for production only.
     * You should obtain a new client_id from a seperate
     * Google Project with a different set of restriction.
     *
     * If you are one of the collaborators of todo-calendar
     * project, get the client_id from @amoshydra or @tayjiehao
     *
     * You may restrict the authorised JavaScript origins
     * in the Developer Console to:
     * Authorised JavaScript origins: e.g.
     *  - https://www.you-own-domain.com or
     *  - <% DOMAIN %>
     */
    client_id: '123456789012-a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6.apps.googleusercontent.com',
  }
};

module.exports = secrets;
