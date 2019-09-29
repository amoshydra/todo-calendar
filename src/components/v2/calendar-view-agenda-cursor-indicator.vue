<template>
  <div class="cursor-indicator" :style="style" />
</template>

<script lang="ts">
import { createComponent, computed, ref, onUnmounted } from '@vue/composition-api';
import { useMousePosition } from './compositions/use-mouse-position';

export function getTime() {
  const time = ref(new Date());

  const interval = setInterval(() => {
    time.value = (new Date());
  }, 1000);

  onUnmounted(() => {
    clearInterval(interval);
  });

  return { time };
}

export default createComponent<{ el: Element }>({
  props: {
    el: {
      required: true,
    }
  },
  setup(props) {
    const element = computed(() => props.el);

    const { y } = useMousePosition({ el: element, offset: { y: 16 } });
    const style = computed(() => ({
      transform: `translateY(${y.value + element.value.scrollTop}px)`,
    }));
    return {
      style
    };
  }
});
</script>

<style lang="scss" scoped>
.cursor-indicator {
  width: 100%;
  border: 1px solid rgba(145, 143, 0, 0.158);
  height: 1px;
  z-index: 0;
  position: absolute;
}
</style>
