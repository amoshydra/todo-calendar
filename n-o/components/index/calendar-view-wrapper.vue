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
    return {
      fcConfig: {
        defaultView: 'agendaDay',
        weekends: false,
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

</style>
