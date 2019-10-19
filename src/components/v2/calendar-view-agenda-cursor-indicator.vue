<template>
  <div class="cursor-indicator" :style="style" />
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api';
import { useMousePosition } from './compositions/use-mouse-position';

export default createComponent<{ el: HTMLElement }>({
  props: {
    el: {
      required: true,
    }
  },
  setup(props) {
    const element = computed(() => props.el);

    const { y } = useMousePosition({ el: element });
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
