<template>
  <div>
    <h2>Today</h2>
    <div class="calendar__full"
         ref="full-calendar">
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

let calendar = null;

export default {
  data() {
    return {};
  },
  props: ['events'],
  watch: {
    events() {
      if (!calendar) return;
      const eventsArray = this.events.map(event => ({
        title: event.summary,
        start: event.start.dateTime,
        end: event.end.dateTime,
      }));

      calendar.fullCalendar('removeEvents');
      calendar.fullCalendar('renderEvents', eventsArray);
    }
  },
  mounted() {
    calendar = $(this.$refs['full-calendar']);

    calendar.fullCalendar({
      defaultView: 'agendaDay',
      header: {
        left: '',
        center: '',
        right: '',
      },
      contentHeight: 600,
      allDaySlot: false,
    });
  }
};
</script>

<style lang="scss">
.calendar__full {
  .fc-header-toolbar,
  .fc-widget-header > table {
    display: none;
  }
  .fc-view > table {
    border: 4px solid #2c3e50;
  }

  td.fc-widget-content {
    background-color: white;
  }

  .fc-time-grid-event {
    color: #828284;
    font-weight: 500;
    background: white;
    border: 2px solid #2c3e50;
    margin-top: -2px;
    padding: 8px;
    // box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.1);
    border-radius: 0;
    transition: transform  0.125s,
                box-shadow 0.125s,
                height     0.125s,
                left       0.125s;
  }
  .fc-time-grid-event:active {
    height: 120px;
    overflow-y: auto;
    z-index: 100 !important;
    box-shadow: 0px 0px 1000px 1px rgba(0,0,0,0.5);
    transform: scale(1.05);
    width: 100%;
    left: -15% !important;
  }
}

</style>
