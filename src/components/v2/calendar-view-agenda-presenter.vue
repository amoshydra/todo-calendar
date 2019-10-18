<template>
  <div
    ref="calendarViewAgenda"
    class="calendar-view-agenda"
    style="touch-action: pan;"
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
    <div
      v-for="(event, index) in events"
      :key="event.id"
      class="entry-presenter-positioner"
      :style="{
        transform: `translateY(${transformationStyles[index].transform.translateY})`,
      }"
    >
      <CalendarViewAgendaEntryPresenter
        :style="{
          marginRight: transformationStyles[index].marginRight,
          minHeight: transformationStyles[index].minHeight,
          transform: `translateX(${transformationStyles[index].transform.translateX})`,
        }"
        :event="event"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, computed, ref, watch } from '@vue/composition-api';
import CalendarViewAgendaEntryPresenter from './calendar-view-agenda-entry-presenter.vue';
import CalendarViewAgendaNowIndicator from './calendar-view-agenda-now-indicator.vue';
import CalendarViewAgendaCursorIndicator from './calendar-view-agenda-cursor-indicator.vue';
import CalendarViewAgendaGridLine from './calendar-view-agenda-grid-line.vue';
import { useScaleWithMouseWheel } from './compositions/use-scale-with-mouse-wheel';
import { computeEventsTransformation } from './compositions/compute-events-transformation';
import { maintainScrollPosition } from './compositions/maintain-scroll-position';
import { getTouchPinchValue } from './compositions/get-touch-pinch-value';

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

    const { pinchValue } = getTouchPinchValue(calendarViewAgenda);
    const clamp = (value: number) => Math.min(20, Math.max(0.5, value));
    watch(() => pinchValue.value, () => {
      const pinchFactor = pinchValue.value * 0.0005;

      scale.value = clamp(scale.value + (pinchFactor));
    });

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

.calendar-view-agenda {
  position: relative;
}
.entry-presenter-positioner {
  position: absolute;
  max-width: calc(100% - 64px);
}
</style>
