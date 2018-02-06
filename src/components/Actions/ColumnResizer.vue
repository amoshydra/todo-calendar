<template>
  <div
    class="column-resizer"
    @mousedown="mousedown"
    @mouseup="mouseup"
  ></div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 200,
    },
  },
  data() {
    return {
      active: false,
    };
  },
  mounted() {
    if (localStorage.getItem('ratio')) {
      this.$emit('input', parseInt(localStorage.getItem('ratio'), 10));
    }

    window.addEventListener('mousemove', this.mousemove);
    window.addEventListener('mouseup', this.mouseup);
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.mousemove);
    window.removeEventListener('mouseup', this.mouseup);
  },
  methods: {
    mousedown(event) {
      this.active = true;
    },
    mousemove(event) {
      if (this.active) {
        const newVal = this.value + event.movementX;

        this.$emit('input', newVal);
        localStorage.setItem('ratio', newVal);
      }
    },
    mouseup(event) {
      this.active = false;
    },
  },
};
</script>

<style>
.column-resizer {
  border-left: 5px dashed rgba(0,0,0,0.1);
  height: 500px;
  margin-top: 6em;
  cursor: col-resize;
}
</style>
