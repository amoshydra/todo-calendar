<template>
  <div
    class="calendar-view-wrapper"
  >
    <full-calendar
      @mousewheel.native="$_handleZoom"
      @event-drop="$_handleEventUpdated"
      @event-resize="$_handleEventUpdated"
      @event-selected="$_handleEventSelected"
      @event-created="$_handleEventCreated"

      ref="calendar"
      :events="fcEvents"
      :config="fcConfig"

    ></full-calendar>

    <ModalContainer
      ref="modal"
      targetClass="event-detail"
    >
      <CalendarViewItemDetail
        :selectedEvent="selectedEvent"
      />
    </ModalContainer>

  </div>
</template>

<script>
import { FullCalendar } from 'vue-full-calendar';
import 'fullcalendar/dist/fullcalendar.css';

import ModalContainer from '@/components/shared/modal-container';

import CalendarViewItemDetail from './calendar-view-item-detail';

const toPaddedString = input => `${input}`.padStart(2, '0');
const getSlotDurationWithMinute = (minute) => {
  const zoomLevelString = toPaddedString(minute);
  const slotDuration = `00:${zoomLevelString}:${minute ? '0' : '6'}0`;
  return slotDuration;
};

export default {
  components: {
    FullCalendar,
    ModalContainer,
    CalendarViewItemDetail,
  },
  data() {
    const fifteenMinsAgo = new Date((new Date() - (60 * 15 * 1000)));
    fifteenMinsAgo.getHours();

    const initialZoomLevel = parseInt(localStorage.getItem('zoomLevel')) || 15;

    this.bindedCalendarFetcher = this.$_handleCalendarFetching.bind(this);
    this.bindedFcScrollingHandler = this.$_handleFcScrolling.bind(this);

    return {
      zoomLevel: initialZoomLevel,
      fcConfig: {
        defaultView: 'agendaDay',
        weekends: false,
        nowIndicator: true,
        contentHeight: 'auto',
        allDaySlot: false,
        slotDuration: getSlotDurationWithMinute(initialZoomLevel),
        scrollTime: [fifteenMinsAgo.getHours(), fifteenMinsAgo.getMinutes(), '00'].map(toPaddedString).join(':'),
        slotEventOverlap: false,
        viewDestroy: (view) => {
          if (view.name === 'agendaDay' || view.name === 'agendaWeek') {
            this.$_removeFcScrollListener(view);
          }
        },
        viewRender: (view) => {
          if (!(
            this.renderedView.start.valueOf() === view.start.valueOf()
            && this.renderedView.end.valueOf() === view.end.valueOf())
          ) {
            this.renderedView.start = view.start;
            this.renderedView.end = view.end;
            this.$_handleCalendarFetching(view.start, view.end);
          }

          if (view.name === 'agendaDay' || view.name === 'agendaWeek') {
            this.$_addFcScrollListener(view);
          }
        }
      },
      selectedEvent: null,
      agendaScrollTop: 0,
      agendaScrollerEl: null,
      renderedView: {
        start: 0,
        end: 0,
      },
    };
  },
  computed: {
    fcEvents() {
      return this.$_makeFcEvents(this.$store.state.calendar.events);
    },
  },
  methods: {
    fireMethod(methodName, options) {
      return this.$refs.calendar.fireMethod(methodName, options);
    },

    $_handleFcScrolling(event) {
      this.agendaScrollTop = this.agendaScrollerEl.scrollTop;
    },

    $_removeFcScrollListener({ scroller }) {
      [...scroller.scrollEl].forEach((element) => {
        element.removeEventListener('scroll', this.bindedFcScrollingHandler);
      });
    },
    $_addFcScrollListener({ scroller }) {
      [this.agendaScrollerEl] = scroller.scrollEl;
      this.agendaScrollerEl.scrollTop = this.agendaScrollTop || this.agendaScrollerEl.scrollTop;
      this.agendaScrollerEl.addEventListener('scroll', this.bindedFcScrollingHandler);
    },

    $_handleEventSelected(event, jsEvent, view) {
      this.selectedEvent = event;
      this.$refs.modal.show();
    },

    $_handleEventCreated({ start, end }) {
      if ((end - start) <= 1800000) return; // prevent single click creation

      this.$store.dispatch('calendar/insert', {
        calendarId: 'primary',
        resource: {
          start: {
            dateTime: new Date(start.format()).toISOString(),
          },
          end: {
            dateTime: new Date(end.format()).toISOString(),
          },
        },
      });
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

      this.$store.dispatch('calendar/update', {
        calendarId: 'primary',
        eventId: event.id,
        resource: event,
      });
    },

    $_handleZoom(event) {
      if (!event.ctrlKey) return;

      event.preventDefault();
      const zoomFactor = (event.wheelDeltaY > 0) ? -5 : 5;
      const proposedZoomLevel = this.zoomLevel + zoomFactor;
      this.zoomLevel = Math.min(Math.max(proposedZoomLevel, 0), 60);
      localStorage.setItem('zoomLevel', this.zoomLevel);

      const scrollRatio = this.agendaScrollerEl.scrollTop / this.agendaScrollerEl.scrollHeight;
      this.fireMethod('option', {
        slotDuration: getSlotDurationWithMinute(this.zoomLevel),
      });
      this.agendaScrollerEl.scrollTop = scrollRatio * this.agendaScrollerEl.scrollHeight;
    },

    $_handleCalendarFetching(startWithoutTZ, endWithoutTZ, timezone, callback) {
      this.$store.dispatch('calendar/list', {
        start: new Date(startWithoutTZ.toISOString()),
        end: new Date(endWithoutTZ.toISOString()),
      });
    },

    $_makeFcEvents(events) {
      return events.map(event => ({
        title: event.summary,
        start: event.start.dateTime,
        end: event.end.dateTime,
        data: event,
      }));
    },
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
  border-radius: 4px;
  border: 1px solid rgba(0,0,0,0.15);
  color: black;
  background: hsla(518, 100%, 90%, 0.9);

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


/* Make dynamic calendar height */
.fc-scroller {
  max-height: calc(100vh - 320px);
}
</style>
