<template>
  <div class="now-indicator" :style="style" />
</template>

<script lang="ts">
import { createComponent, computed, ref, onUnmounted } from '@vue/composition-api';

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

export default createComponent({
  props: {
    scale: {
      type: Number,
    }
  },
  setup(props) {
    const timeRef = getTime();

    const style = computed(() => {
      const time = timeRef.time.value;
      const offset = (
        (time.getHours() * 100) +
        (time.getMinutes() / 3 * 5) +
        (time.getSeconds() / 3000 * 5)
      );

      return {
        transform: `translateY(${props.scale * offset}px)`,
      };
    });
    return {
      style
    };
  }
});
</script>

<style lang="scss" scoped>
.now-indicator {
  width: 100%;
  border: 1px solid rgba(255,0,0,0.2);
  height: 1px;
  z-index: 0;
  position: absolute;
}

</style>
