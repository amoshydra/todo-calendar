<template>
  <div
    ref="nowIndicator"
    class="now-indicator"
    :style="style"
  />
</template>

<script lang="ts">
import Time from 'time-chainer';
import { createComponent, computed, onMounted, ref } from '@vue/composition-api';
import { useCurrentTime } from './compositions/use-current-time';

export default createComponent({
  props: {
    scale: {
      type: Number,
      required: true,
    },
    scrollToView: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const midnight = new Date().setHours(0, 0, 0, 0);
    const { time } = useCurrentTime({
      interval: Time.seconds(60),
    });

    const factor = Time.hours(1) / 100;

    const style = computed(() => {
      const offset = (time.value - midnight) / factor;

      return {
        transform: `translateY(${props.scale * offset}px)`,
      };
    });

    const nowIndicator = ref<HTMLElement>(null);
    onMounted(() => {
      if (!props.scrollToView) { return; }
      (nowIndicator.value as HTMLElement).scrollIntoView();
    });

    return {
      style,
      nowIndicator,
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
