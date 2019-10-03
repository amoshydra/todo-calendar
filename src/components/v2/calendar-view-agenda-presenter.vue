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

.agenda-entry {
  position: absolute;
  background: #91fdcbe0;
  backdrop-filter: blur(1px);
  transition:
    box-shadow $animation-speed,
  ;

  &:hover {
    box-shadow: 8px 8px 32px 0 rgba(0,0,0,0.2);
  }
  &:focus {
    z-index: 2;
    box-shadow: 8px 8px 32px 0 rgba(0,0,0,0.2);
  }
}

.calendar-view-agenda {
  position: relative;
}
</style>
