<template>
  <div
    ref="calendarViewAgenda"
    class="calendar-view-agenda"
  >
    <CalendarViewAgendaGridLine
      :scale="scale"
    />
    <CalendarViewAgendaNowIndicator
      :scale="scale"
      scroll-to-view
    />
    <CalendarViewAgendaCursorIndicator
      v-if="calendarViewAgenda"
      :el="calendarViewAgenda"
    />
    <CalendarViewAgendaEntryPresenter
      v-for="(event, index) in events"
      :key="event.id"
      tabindex="-1"
      :style="transformationStyles[index]"
      class="agenda-entry"
      :event="event"
    />
  </div>
</template>

<script lang="ts">
import { createComponent, computed, ref } from '@vue/composition-api';
import CalendarViewAgendaEntryPresenter from './calendar-view-agenda-entry-presenter.vue';
import CalendarViewAgendaNowIndicator from './calendar-view-agenda-now-indicator.vue';
import CalendarViewAgendaCursorIndicator from './calendar-view-agenda-cursor-indicator.vue';
import CalendarViewAgendaGridLine from './calendar-view-agenda-grid-line.vue';
import { useScaleWithMouseWheel } from './compositions/use-scale-with-mouse-wheel';
import { computeEventsTransformation } from './compositions/compute-events-transformation';
import { maintainScrollPosition } from './compositions/maintain-scroll-position';

interface Props {
  events: gapi.client.calendar.Event[]
}

export default createComponent<Props>({
  components: {
    CalendarViewAgendaEntryPresenter,
    CalendarViewAgendaNowIndicator,
    CalendarViewAgendaCursorIndicator,
    CalendarViewAgendaGridLine,
  },
  props: {
    events: {
      required: true,
    }
  },
  setup(props) {
    const calendarViewAgenda = ref(null);
    const { scale } = useScaleWithMouseWheel({
      initial: 1.5,
      min: 0.5,
      max: 20,
      invert: true,
      scale: 0.002,
      el: calendarViewAgenda
    });

    maintainScrollPosition({ scale, el: calendarViewAgenda });

    const eventSource = computed(() => props.events);
    const { transformationStyles } = computeEventsTransformation(
      { events: eventSource },
      { scale },
      {
        minHeight: 60,
        paddingLeft: 50,
      }
    );

    return {
      calendarViewAgenda,
      transformationStyles,
      scale,
    };
  }
});
</script>

<style lang="scss" scoped>
$animation-speed: 0.5s linear;
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap');

.agenda-entry {
  position: absolute;
  background-color: #91fdcbe0;
  // backdrop-filter: blur(1px);
  // Disable filter for better performance
  transition:
    box-shadow 0.25s ease-in-out,
    background-color 0.25s ease-in-out,
  ;
  max-width: calc(100% - 64px);

  /deep/ .summary {
    font-family: 'Roboto Mono', monospace;
    font-weight: 600;
    color: rgba(black, 0.85);
  }

  &:hover {
    box-shadow: 2px 2px 16px 0 rgba(0,0,0,0.1);
  }
  &:focus {
    z-index: 2;
    box-shadow: 16px 16px 64px 0 rgba(#91fdcbe0 ,0.3);
    height: auto !important;
    background-color: #95fd91fb;

    /deep/ .summary {
      overflow: visible;
      white-space: normal;
      color: rgba(black, 1.0);
    }
  }
}

.calendar-view-agenda {
  position: relative;
}
</style>
