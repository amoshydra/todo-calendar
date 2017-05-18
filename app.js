function handleAuthClick() {};
function handleSignoutClick() {};
function listUpcomingEvents() {};

var app = new Vue({
  el: '#app',
  data: {
    events: [],
    isSignedIn: false
  },
  methods: {
    signIn: handleAuthClick,
    signOut: handleSignoutClick,
    update: listUpcomingEvents,
  },
  computed: {
    processed: function() {
      this.events.forEach(function(event) {
        event.todoCal = {
          start: {},
          end: {}
        };
        event.todoCal.start.dateTime = moment(event.start.dateTime).startOf('hour').fromNow();
        event.todoCal.end.dateTime = moment(event.end.dateTime).startOf('hour').fromNow();
      });
      return this.events;
    }
  },
  mounted() {
    this.events = [ { "kind": "calendar#event", "etag": "\"2989542859180000\"", "id": "8lk8l53lmpem4ece9omqievaps", "status": "confirmed", "htmlLink": "https://www.google.com/calendar/event?eid=OGxrOGw1M2xtcGVtNGVjZTlvbXFpZXZhcHMgYW1vc0B2aWRkc2VlLmNvbQ", "created": "2017-05-09T10:32:19.000Z", "updated": "2017-05-14T14:17:09.590Z", "summary": "Develop styleguide for element within main page", "creator": { "email": "amos@viddsee.com", "self": true }, "organizer": { "email": "amos@viddsee.com", "self": true }, "start": { "dateTime": "2017-05-17T00:00:00+08:00" }, "end": { "dateTime": "2017-05-17T01:00:00+08:00" }, "iCalUID": "8lk8l53lmpem4ece9omqievaps@google.com", "sequence": 6, "hangoutLink": "https://plus.google.com/hangouts/_/viddsee.com/amos?hceid=YW1vc0B2aWRkc2VlLmNvbQ.8lk8l53lmpem4ece9omqievaps", "reminders": { "useDefault": true } }, { "kind": "calendar#event", "etag": "\"2989576426850000\"", "id": "nupbg5gmh9rfujl0i9v0m0h3m4", "status": "confirmed", "htmlLink": "https://www.google.com/calendar/event?eid=bnVwYmc1Z21oOXJmdWpsMGk5djBtMGgzbTQgYW1vc0B2aWRkc2VlLmNvbQ", "created": "2017-05-12T03:14:02.000Z", "updated": "2017-05-14T18:56:53.425Z", "summary": "Update viddsee logo", "creator": { "email": "amos@viddsee.com", "self": true }, "organizer": { "email": "amos@viddsee.com", "self": true }, "start": { "dateTime": "2017-05-17T01:00:00+08:00" }, "end": { "dateTime": "2017-05-17T02:00:00+08:00" }, "iCalUID": "nupbg5gmh9rfujl0i9v0m0h3m4@google.com", "sequence": 2, "hangoutLink": "https://plus.google.com/hangouts/_/viddsee.com/amos?hceid=YW1vc0B2aWRkc2VlLmNvbQ.nupbg5gmh9rfujl0i9v0m0h3m4", "reminders": { "useDefault": true } }, { "kind": "calendar#event", "etag": "\"2989576432252000\"", "id": "k9vdbckne95e7lc3o7p2muda40", "status": "confirmed", "htmlLink": "https://www.google.com/calendar/event?eid=azl2ZGJja25lOTVlN2xjM283cDJtdWRhNDAgYW1vc0B2aWRkc2VlLmNvbQ", "created": "2017-05-09T08:05:27.000Z", "updated": "2017-05-14T18:56:56.126Z", "summary": "Develop styleguide for Join page", "creator": { "email": "amos@viddsee.com", "self": true }, "organizer": { "email": "amos@viddsee.com", "self": true }, "start": { "dateTime": "2017-05-17T02:00:00+08:00" }, "end": { "dateTime": "2017-05-17T03:00:00+08:00" }, "iCalUID": "k9vdbckne95e7lc3o7p2muda40@google.com", "sequence": 8, "hangoutLink": "https://plus.google.com/hangouts/_/viddsee.com/amos?hceid=YW1vc0B2aWRkc2VlLmNvbQ.k9vdbckne95e7lc3o7p2muda40", "reminders": { "useDefault": true } }, { "kind": "calendar#event", "etag": "\"2989576433492000\"", "id": "prk5befuprjtsbi3f1n8f71org", "status": "confirmed", "htmlLink": "https://www.google.com/calendar/event?eid=cHJrNWJlZnVwcmp0c2JpM2YxbjhmNzFvcmcgYW1vc0B2aWRkc2VlLmNvbQ", "created": "2017-05-08T10:32:20.000Z", "updated": "2017-05-14T18:56:56.746Z", "summary": "#20", "creator": { "email": "amos@viddsee.com", "self": true }, "organizer": { "email": "amos@viddsee.com", "self": true }, "start": { "dateTime": "2017-05-17T03:00:00+08:00" }, "end": { "dateTime": "2017-05-17T04:00:00+08:00" }, "iCalUID": "prk5befuprjtsbi3f1n8f71org@google.com", "sequence": 11, "hangoutLink": "https://plus.google.com/hangouts/_/viddsee.com/amos?hceid=YW1vc0B2aWRkc2VlLmNvbQ.prk5befuprjtsbi3f1n8f71org", "reminders": { "useDefault": true } }, { "kind": "calendar#event", "etag": "\"2989665992596000\"", "id": "gsmn5msb6vfaie4l76jq2ke6oo", "status": "confirmed", "htmlLink": "https://www.google.com/calendar/event?eid=Z3NtbjVtc2I2dmZhaWU0bDc2anEya2U2b28gYW1vc0B2aWRkc2VlLmNvbQ", "created": "2017-05-15T07:23:07.000Z", "updated": "2017-05-15T07:23:16.298Z", "summary": "Fix TweEmoji is broken", "description": " height: 1em;\n width: 1em;\n margin: 0 .05em 0 .1em;\n vertical-align: -0.1em;", "creator": { "email": "amos@viddsee.com", "self": true }, "organizer": { "email": "amos@viddsee.com", "self": true }, "start": { "dateTime": "2017-05-17T05:00:00+08:00" }, "end": { "dateTime": "2017-05-17T06:00:00+08:00" }, "iCalUID": "gsmn5msb6vfaie4l76jq2ke6oo@google.com", "sequence": 0, "hangoutLink": "https://plus.google.com/hangouts/_/viddsee.com/amos?hceid=YW1vc0B2aWRkc2VlLmNvbQ.gsmn5msb6vfaie4l76jq2ke6oo", "reminders": { "useDefault": true } }, { "kind": "calendar#event", "etag": "\"2989669095578000\"", "id": "gcl566h7vdckvfuafbj6p91qto", "status": "confirmed", "htmlLink": "https://www.google.com/calendar/event?eid=Z2NsNTY2aDd2ZGNrdmZ1YWZiajZwOTFxdG8gYW1vc0B2aWRkc2VlLmNvbQ", "created": "2017-05-15T07:49:01.000Z", "updated": "2017-05-15T07:49:07.789Z", "summary": "NotReported: See community page, user will not know the list is vertically scrollable", "creator": { "email": "amos@viddsee.com", "self": true }, "organizer": { "email": "amos@viddsee.com", "self": true }, "start": { "dateTime": "2017-05-18T00:00:00+08:00" }, "end": { "dateTime": "2017-05-18T01:00:00+08:00" }, "iCalUID": "gcl566h7vdckvfuafbj6p91qto@google.com", "sequence": 1, "hangoutLink": "https://plus.google.com/hangouts/_/viddsee.com/amos?hceid=YW1vc0B2aWRkc2VlLmNvbQ.gcl566h7vdckvfuafbj6p91qto", "reminders": { "useDefault": true } }, { "kind": "calendar#event", "etag": "\"2989669247120000\"", "id": "7k0t7urumgrjo8p8cck7jdoi0g", "status": "confirmed", "htmlLink": "https://www.google.com/calendar/event?eid=N2swdDd1cnVtZ3JqbzhwOGNjazdqZG9pMGcgYW1vc0B2aWRkc2VlLmNvbQ", "created": "2017-05-15T07:50:23.000Z", "updated": "2017-05-15T07:50:23.560Z", "summary": "Create styleguide for Navigation Bar Dropdown", "creator": { "email": "amos@viddsee.com", "self": true }, "organizer": { "email": "amos@viddsee.com", "self": true }, "start": { "dateTime": "2017-05-18T01:00:00+08:00" }, "end": { "dateTime": "2017-05-18T02:00:00+08:00" }, "iCalUID": "7k0t7urumgrjo8p8cck7jdoi0g@google.com", "sequence": 0, "hangoutLink": "https://plus.google.com/hangouts/_/viddsee.com/amos?hceid=YW1vc0B2aWRkc2VlLmNvbQ.7k0t7urumgrjo8p8cck7jdoi0g", "reminders": { "useDefault": true } }, { "kind": "calendar#event", "etag": "\"2989671997250000\"", "id": "v6avesash5sjutk91iiqs8t47s", "status": "confirmed", "htmlLink": "https://www.google.com/calendar/event?eid=djZhdmVzYXNoNXNqdXRrOTFpaXFzOHQ0N3MgYW1vc0B2aWRkc2VlLmNvbQ", "created": "2017-05-15T08:13:18.000Z", "updated": "2017-05-15T08:13:18.625Z", "summary": "Create styleguide for footer link", "creator": { "email": "amos@viddsee.com", "self": true }, "organizer": { "email": "amos@viddsee.com", "self": true }, "start": { "dateTime": "2017-05-18T02:00:00+08:00" }, "end": { "dateTime": "2017-05-18T03:00:00+08:00" }, "iCalUID": "v6avesash5sjutk91iiqs8t47s@google.com", "sequence": 0, "hangoutLink": "https://plus.google.com/hangouts/_/viddsee.com/amos?hceid=YW1vc0B2aWRkc2VlLmNvbQ.v6avesash5sjutk91iiqs8t47s", "reminders": { "useDefault": true } } ]
  }
})



var inputForm = document.getElementById('command-form');
var inputField = inputForm.querySelector('.command-input');
var inputHistory = inputForm.querySelector('.command-history');

inputForm.addEventListener('submit', function(event) {
  event.preventDefault();
  console.log(inputField.value);
  inputHistory.textContent = inputField.value;
  inputField.value = '';
});

