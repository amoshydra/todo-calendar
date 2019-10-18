<template>
  <div
    ref="entryController"
    tabindex="-1"
    class="entry-controller"
    @mousedown="mousedown"
    @mouseup="mouseup"
  >
    <div class="indicator">
      {{ travelled }}
    </div>
  </div>
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

    const mouseMove = () => {
      travelled.value = mousePosition.y.value - downValue;
      context.emit('travel', travelled.value);
    };
    const mouseup = () => {
      context.emit('input', travelled.value);
      travelled.value = 0;
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseup);
    };
    const mousedown = () => {
      downValue = mousePosition.y.value;
      window.addEventListener('mousemove', mouseMove);
      window.addEventListener('mouseup', mouseup);
    };

    onUnmounted(() => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseup);
    });

    return {
      entryController,
      mousedown,
      mouseup,
      travelled,
    };
  }
});
</script>

<style lang="scss" scoped>
.entry-controller {
  border-bottom: 0.5em solid rgba(0,0,0,0.05);
  width: 100%;
  bottom: 0;
  transform: translateY(-100%);
  user-select: none;
}

.indicator {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}
</style>
