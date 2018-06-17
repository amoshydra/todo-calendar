<template>
  <div
    class="calendar-view-wrapper"
  >
    <full-calendar
      @mousewheel.native="$_handleZoom"

      ref="calendar"
      :events="fcEvents"
      :config="fcConfig"
    ></full-calendar>
  </div>
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
      zoomLevel: 15,
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
  methods: {
    fireMethod(methodName, options) {
      return this.$refs.calendar.fireMethod(methodName, options);
    },
    $_setZoom(zoomLevel) {
      const zoomLevelString = `${zoomLevel}`.padStart(2, '0')
      this.fireMethod('option', {
        slotDuration: `00:${zoomLevelString}:${zoomLevel ? '0' : '6'}0`,
      });
    },
    $_handleZoom(event) {
      if (!event.ctrlKey) return;

      event.preventDefault();
      const zoomFactor = (event.wheelDeltaY > 0) ? -5 : 5;
      const proposedZoomLevel = this.zoomLevel + zoomFactor;
      this.zoomLevel = Math.min(Math.max(proposedZoomLevel, 0), 60);
      this.$_setZoom(this.zoomLevel);
    },
  },
};
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
