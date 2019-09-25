<template>
  <div
    v-if="visibility"
    class="modal__overlay"
    @click="handleOverlayClicked"
  >
    <div
      ref="modal-container"
      class="modal__container"
      :class="targetClass"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    targetClass: {
      type: [String, Array, Object],
      default: undefined,
    },
  },
  data() {
    return {
      visibility: false,
    };
  },
  methods: {
    handleOverlayClicked(event) {
      if (event.target === this.$el) { this.visibility = false; }
    },
    show() {
      this.visibility = true;
    },
    hide() {
      this.visibility = false;
    },
    toggle() {
      this.visibility = !this.visibility;
    },
  },
};
</script>

<style>
@keyframes floatUp {
  from { transform: translateY(2%); }
  to   { transform: translateY( 0%); }
}
@keyframes fadeIn {
  from { background: rgba(0,0,0,0.0); }
  to   { background: rgba(0,0,0,0.2); }
}

.modal__overlay {

  background: rgba(0,0,0,0.2);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  text-align: initial;
  font-size: 1rem;

  z-index: 1030;

  animation-name: fadeIn;
  animation-duration: 0.2s;
}

.modal__container {
  pointer-events: auto;
  max-width: 500px;
  width: 100%;
  margin: 8px;
  max-height: 500px;
  height: 100%;
  background: white;
  box-shadow: 1px 1px 1px 0 rgba(0,0,0,0.1);
  animation-name: floatUp;
  animation-duration: 0.25s;
}
</style>
