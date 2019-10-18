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
        :event="event"
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
import { createComponent, ref, computed, Ref } from '@vue/composition-api';
import CalendarViewAgendaEntryPresenter from './calendar-view-agenda-entry-presenter.vue';
import CalendarViewAgendaEntryController from './calendar-view-agenda-entry-controller.vue';

export default createComponent<{
  transformation: {
    height: number,
    y: number,
    x: number,
  },
  event: gapi.client.calendar.Event,
  rootElement: HTMLElement | null,
}>({
  components: {
    CalendarViewAgendaEntryPresenter,
    CalendarViewAgendaEntryController,
  },
  props: {
    transformation: Object,
    event: Object,
    rootElement: process.server ? Object : Element,
  },
  setup(props) {
    const isHovered = ref(false);
    const isFocused = ref(false);

    const travelled = ref(0);
    const handleTravel = (travelledValue: number) => {
      travelled.value = travelledValue;
    };
    const handleInput = (_travelledValue: number) => {
      setTimeout(() => {
        travelled.value = 0;
      }, 1000);
    };

    const positionStyle = computed(() => ({
      marginRight: `${isFocused.value ? props.transformation.x : 0}px`,
      height: `${Math.max(58, props.transformation.height + travelled.value)}px`,
      minHeight: `${props.transformation.height + travelled.value}px`,
      transform: `translateX(${props.transformation.x}px)`,
    }));

    return {
      isHovered,
      isFocused,
      positionStyle,
      handleTravel,
      handleInput,
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
}
.inner {
  transition: transform 0.25s ease-in-out;
  pointer-events: auto;
}
</style>
