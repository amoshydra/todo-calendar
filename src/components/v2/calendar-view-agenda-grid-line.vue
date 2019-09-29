<template>
  <div>
    <div
      v-for="(line) in lines"
      :key="line.display"
      class="grid-line"
      :style="line.style"
    >
      {{ line.display }}
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api';

export default createComponent({
  props: {
    scale: {
      type: Number,
      required: true,
    }
  },
  setup(props) {
    const array = [...new Array(25)];

    const lines = computed(() => {
      const scale = props.scale * 100;

      return array.map((_x, index) => ({
        style: {
          transform: `translateY(${scale * (index)}px)`,
          // margin: '64px 0'
        },
        display: `${index}`.padStart(2, '0') + ':00',
      }));
    });

    return {
      lines
    };
  }
});
</script>

<style lang="scss" scoped>
.grid-line {
  border-top: 1px solid rgba(0,0,0,0.05);
  position: absolute;
  width: 100%;
  height: 1px;
  font-size: 0.5em;
}
</style>
