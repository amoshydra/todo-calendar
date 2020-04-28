<template>
  <div
    ref="entryController"
    tabindex="-1"
    class="entry-controller"
    @pointerdown="mousedown"
  />
</template>

<script lang="ts">
import { createComponent, ref, onUnmounted, computed } from '@vue/composition-api';
import { useMousePosition } from './compositions/use-mouse-position';

export default createComponent<{
  event: gapi.client.calendar.Event,
  rootElement: HTMLElement | null,
}>({
  props: {
    event: Object,
    rootElement: process.server ? Object : Element,
  },
  setup(props, context) {
    const entryController = ref(null);
    const el = computed(() => props.rootElement);
    const mousePosition = useMousePosition({ el });

    let downValue = 0;
    const travelled = ref(0);

    const inhibitEvent = (e: Event) => e.preventDefault();

    const mousemove = (_event: PointerEvent) => {
      travelled.value = mousePosition.y.value - downValue;
      context.emit('travel', travelled.value | 0);
    };
    const mouseup = () => {
      context.emit('input', travelled.value | 0);
      travelled.value = 0;
      document.body.removeEventListener('pointerup', mouseup);
      document.body.removeEventListener('pointermove', mousemove);
      el.value && el.value.removeEventListener('touchmove', inhibitEvent);
    };
    const mousedown = () => {
      downValue = mousePosition.y.value;
      el.value && el.value.addEventListener('touchmove', inhibitEvent);
      document.body.addEventListener('pointerup', mouseup);
      document.body.addEventListener('pointermove', mousemove);
    };

    onUnmounted(() => {
      document.body.removeEventListener('pointermove', mousemove);
      document.body.removeEventListener('pointerup', mouseup);
    });

    return {
      entryController,
      mousedown,
      mouseup,
      mousemove,
      travelled,
    };
  }
});
</script>

<style lang="scss" scoped>
.entry-controller {
  position: absolute;

  border-bottom: 1.5em solid rgba(0,0,0,0.05);
  width: 52px;
  bottom: 0;
  user-select: none;
  cursor: row-resize;
}

.indicator {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}
</style>
