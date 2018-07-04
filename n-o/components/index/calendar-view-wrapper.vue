<template>
  <div
    class="calendar-view-wrapper"
  >
    <full-calendar
      @mousewheel.native="$_handleZoom"
      @event-drop="$_handleEventUpdated"
      @event-resize="$_handleEventUpdated"

      ref="calendar"
      :events="bindedCalendarFetcher"
      :config="fcConfig"

    ></full-calendar>
  </div>
</template>

<script>
import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/fullcalendar.css';

import calendar from '@/libs/calendar';

const getSlotDurationWithMinute = (minute) => {
  const zoomLevelString = `${minute}`.padStart(2, '0')
  const slotDuration = `00:${zoomLevelString}:${minute ? '0' : '6'}0`;
  return slotDuration;
}

export default {
  components: {
    FullCalendar,
  },
  data() {
    const fifteenMinsAgo = new Date((new Date() - (60 * 15 * 1000)));
    fifteenMinsAgo.getHours();

    const initialZoomLevel = parseInt(localStorage.getItem('zoomLevel')) || 15;

    this.bindedCalendarFetcher = this.$_handleCalendarFetching.bind(this);

    return {
      zoomLevel: initialZoomLevel,
      fcConfig: {
        defaultView: 'agendaDay',
        weekends: false,
        nowIndicator: true,
        contentHeight: 600,
        allDaySlot: false,
        slotDuration: getSlotDurationWithMinute(initialZoomLevel),
        scrollTime: `${fifteenMinsAgo.getHours()}:${fifteenMinsAgo.getMinutes()}:00`,
        slotEventOverlap: false,
      },
    };
  },
  methods: {
    fireMethod(methodName, options) {
      return this.$refs.calendar.fireMethod(methodName, options);
    },

    $_handleEventUpdated(receivedUpdate) {
      const event = {
        ...receivedUpdate.data,
        start: {
          dateTime: new Date(receivedUpdate.start.format()).toISOString(),
        },
        end: {
          dateTime: new Date(receivedUpdate.end.format()).toISOString(),
        },
      };

      calendar.update('primary', event.id, event)
        .then(() => {
          this.$store.dispatch('calendar/list');
        });
    },

    $_handleZoom(event) {
      if (!event.ctrlKey) return;

      event.preventDefault();
      const zoomFactor = (event.wheelDeltaY > 0) ? -5 : 5;
      const proposedZoomLevel = this.zoomLevel + zoomFactor;
      this.zoomLevel = Math.min(Math.max(proposedZoomLevel, 0), 60);
      localStorage.setItem('zoomLevel', this.zoomLevel);
      this.fireMethod('option', {
        slotDuration: getSlotDurationWithMinute(this.zoomLevel),
      });
    },

    $_handleCalendarFetching(startWithoutTZ, endWithoutTZ, timezone, callback) {
      this.$store.dispatch('calendar/list', {
        start: new Date(startWithoutTZ.valueOf()),
        end: new Date(endWithoutTZ.valueOf()),
      })
        .then(events => events.map(event => ({
          title: event.summary,
          start: event.start.dateTime,
          end: event.end.dateTime,
          data: event,
        })))
        .then(callback)
        ;
    }
  },
};
</script>

<style>
/* Style toolbar button */
.calendar-view-wrapper .fc-state-default {
  box-shadow: none;
  border: none;
  text-shadow: none;
  background: none;
  /* New style */
  border-bottom: 2px solid transparent;
  transition:
    border-color 0.2s,
    ;
}
.calendar-view-wrapper .fc-state-hover,
.calendar-view-wrapper .fc-state-down,
.calendar-view-wrapper .fc-state-active {
  border-bottom: 2px solid rgba(0,0,0,0.1);
}
.calendar-view-wrapper .fc-state-disabled {
  border-bottom: 2px solid rgba(0,0,0,0.0);
}
.calendar-view-wrapper .fc-state-default.fc-corner-left,
.calendar-view-wrapper .fc-state-default.fc-corner-right {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.calendar-view-wrapper .fc-state-default.fc-state-down,
.calendar-view-wrapper .fc-state-default.fc-state-active {
  box-shadow: none;
  /* New style */
  border-bottom: 2px solid black;
}

.calendar-view-wrapper .fc-view-container {
  box-shadow: 1px 1px 1px 0 rgba(0,0,0,0.1);
}
/* Remove calendar today yellow */
.calendar-view-wrapper .fc-unthemed td {
  background: white;
}
.calendar-view-wrapper .fc-unthemed td.fc-today {
  background: none;
}


.calendar-view-wrapper .fc-time-grid .fc-event,
.calendar-view-wrapper .fc-time-grid .fc-bgevent {
  border-radius: 0;
  border: 1px solid rgba(0,0,0,0.15);
  color: black;
  background: rgba(254, 254, 254, 0.9);
  background: #91d1ffe6;

  /* For readability */
  min-height: 1em;
  right: initial !important;
  padding: 0.5em;
}

.calendar-view-wrapper .fc-time-grid .fc-event:hover,
.calendar-view-wrapper .fc-time-grid .fc-bgevent:hover {
  /* For readability */
  z-index: 999 !important;
}

.calendar-view-wrapper .fc-time-grid-event .fc-time {
  display: inline;
  margin-right: 6px;
  background-color: rgba(0,0,0,0.8);
  color: white;
}
.calendar-view-wrapper .fc-time-grid-event .fc-time,
.calendar-view-wrapper .fc-time-grid-event .fc-title {
  display: inline;
}

.fc-unthemed th,
.fc-unthemed td,
.fc-unthemed thead,
.fc-unthemed tbody,
.fc-unthemed .fc-divider,
.fc-unthemed .fc-row,
.fc-unthemed .fc-content,
.fc-unthemed .fc-popover,
.fc-unthemed .fc-list-view,
.fc-unthemed .fc-list-heading td {
  border-color: #00000005;
}

</style>
