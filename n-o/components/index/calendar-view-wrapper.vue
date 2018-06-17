<template>
  <full-calendar
    :events="fcEvents"
    :config="fcConfig"
  ></full-calendar>
</template>

<script>
import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/fullcalendar.css';

export default {
  components: {
    FullCalendar,
  },
  props: {
    events: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    const fifteenMinsAgo = new Date((new Date() - (60 * 15 * 1000)));
    fifteenMinsAgo.getHours();

    return {
      fcConfig: {
        defaultView: 'agendaDay',
        weekends: false,
        nowIndicator: true,
        contentHeight: 600,
        allDaySlot: false,
        slotDuration: '00:05:00',
        scrollTime: `${fifteenMinsAgo.getHours()}:${fifteenMinsAgo.getMinutes()}:00`,
        slotEventOverlap: false,
      },
    };
  },
  computed: {
    fcEvents() {
      return this.events
        .map(({ summary, start, end }) => ({
          title: summary,
          start: start.dateTime,
          end: end.dateTime,
        }));
    },
  },
}
</script>

<style>
.calendar-view-wrapper .fc-time-grid .fc-event,
.calendar-view-wrapper .fc-time-grid .fc-bgevent {
  min-height: 1.5em;
}
.calendar-view-wrapper .fc-time-grid .fc-event:hover,
.calendar-view-wrapper .fc-time-grid .fc-bgevent:hover {
  z-index: 999 !important;
}
</style>
