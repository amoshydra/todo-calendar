<template>
  <div
    class="modal__overlay"
    v-if="visibility"
    @click="handleOverlayClicked"
  >
    <div
      ref="modal-container"
      class="modal__container"
      :class="targetClass"
    >
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    targetClass: {},
  },
  data() {
    return {
      visibility: false,
    };
  },
  methods: {
    handleOverlayClicked(event) {
      if (event.target === this.$el) this.visibility = false;
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
.modal__overlay {
  background: rgba(0,0,0,0.2);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;

  text-align: initial;
  font-size: 1rem;
}

.modal__container {
  max-width: 500px;
  width: 100%;
  max-height: 500px;
  height: 100%;
  background: white;
  box-shadow: 1px 1px 1px 0 rgba(0,0,0,0.1);
}
</style>
