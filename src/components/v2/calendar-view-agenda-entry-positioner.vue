<template>
  <div
    class="entry-presenter-positioner"
    :style="{
      transform: `translateY(${transformation.y}px)`,
    }"
    tabindex="0"
    @focus="isFocused = true"
    @blur="isFocused = false"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div
      class="inner"
      :style="positionStyle"
    >
      <CalendarViewAgendaEntryPresenter
        :class="{
          focus: isFocused,
          hover: isHovered,
        }"
        :event="transformedEvent"
      />
      <CalendarViewAgendaEntryController
        v-show="isHovered"
        :event="event"
        :root-element="rootElement"
        @input="handleInput"
        @travel="handleTravel"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, ref, computed, Ref, watch } from '@vue/composition-api';
import CalendarViewAgendaEntryPresenter from './calendar-view-agenda-entry-presenter.vue';
import CalendarViewAgendaEntryController from './calendar-view-agenda-entry-controller.vue';

export default createComponent<{
  transformation: {
    minHeight: number,
    height: number,
    y: number,
    x: number,
  },
  event: gapi.client.calendar.Event,
  rootElement: HTMLElement | null,
  scale: number,
}>({
  components: {
    CalendarViewAgendaEntryPresenter,
    CalendarViewAgendaEntryController,
  },
  props: {
    transformation: Object,
    event: Object,
    rootElement: process.server ? Object : Element,
    scale: Number,
  },
  setup(props, context) {
    const isHovered = ref(false);
    const isFocused = ref(false);

    const travelled = ref(0);
    watch(() => props.event, () => {
      // Reset travelled once prop changed
      travelled.value = 0;
    });

    const transformedEndDate = computed(() => {
      const travelledPx = travelled.value;
      if (travelledPx === 0) {
        return props.event.end!.dateTime!;
      }

      const convertDateToInt = (date: Date) => date.getHours() * 100 + (date.getMinutes() / 3 * 5);
      const convertIntToDate = (value: number, base: Date) => {
        const newDate = new Date(base);
        newDate.setHours(value / 100 | 0);
        newDate.setMinutes(value % 100 / 5 * 3);
        return newDate;
      };

      const startDate = new Date(props.event.start!.dateTime!);
      const startInt = convertDateToInt(startDate);
      const endInt = convertDateToInt(new Date(props.event.end!.dateTime!));

      /*
        height = (endInt - startInt) * props.scale;
        height + travelledPx = ((endInt + moreInt) - startInt) * props.scale;
        (height + travelledPx)/props.scale = (endInt + moreInt - startInt);
        (height + travelledPx)/props.scale = (endInt - startInt) + moreInt;
        (height + travelledPx)/props.scale - (endInt - startInt) = moreInt
        moreInt = (height + travelledPx)/props.scale - (endInt - startInt)
      */
      const moreInt = (props.transformation.height + travelledPx) / props.scale - (endInt - startInt);
      const expectedInt = Math.max(startInt, endInt + moreInt);
      return convertIntToDate(expectedInt, startDate).toISOString();
    });

    const transformedEvent: Ref<gapi.client.calendar.Event> = computed(() => ({
      ...props.event,
      end: {
        dateTime: transformedEndDate.value,
      }
    }));

    const positionStyle = computed(() => ({
      marginRight: `${isFocused.value ? props.transformation.x : 0}px`,
      height: `${Math.max(props.transformation.minHeight, props.transformation.height + travelled.value)}px`,
      minHeight: `${props.transformation.minHeight}px`,
      transform: `translateX(${props.transformation.x}px)`,
    }));

    return {
      isHovered,
      isFocused,

      transformedEvent,
      positionStyle,

      handleTravel(travelledValue: number) {
        travelled.value = travelledValue;
      },
      handleInput() {
        context.emit('input', {
          id: transformedEvent.value.id,
          start: {
            dateTime: transformedEvent.value.start!.dateTime
          },
          end: {
            dateTime: transformedEvent.value.end!.dateTime
          }
        });
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.entry-presenter-positioner:focus {
  outline: none;
  z-index: 2;
}
.entry-presenter-positioner:active {
  outline: none;
  z-index: 3;
}

.entry-presenter-positioner {
  pointer-events: none;
  user-select: none;
}
.inner {
  transition: transform 0.25s ease-in-out;
  pointer-events: auto;
}
</style>
