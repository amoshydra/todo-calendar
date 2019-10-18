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
      :style="({
        marginRight: `${isFocused ? transformation.x : 0}px`,
        height: `${transformation.height}px`,
        minHeight: `${transformation.height}px`,
        transform: `translateX(${transformation.x}px)`,
      })"
    >
      <slot
        v-bind="{
          isHovered,
          isFocused,
        }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api';

export default createComponent<{
  transformation: {
    height: number,
    y: number,
    x: number,
  },
}>({
  props: {
    transformation: Object,
  },
  setup() {
    const isHovered = ref(false);
    const isFocused = ref(false);
    return {
      isHovered,
      isFocused,
    };
  },
});
</script>

<style lang="scss" scoped>
.entry-presenter-positioner:focus {
  outline: none;
  z-index: 2;
}

.entry-presenter-positioner {
  pointer-events: none;
}
.inner {
  transition: transform 0.25s ease-in-out;
  pointer-events: auto;
}
</style>
