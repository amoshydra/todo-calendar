<template>
  <div
    class="command-summarizer"
  >
    <a @click="$refs.modal.show()">Show modal</a>

    <ModalContainer
      ref="modal"
      targetClass="summary-wrapper"
    >
      <h4>Summary</h4>
      <div class="summary-item-container">
        <div
          v-for="event in events"
          :key="event.id"
          class="summary-item"
          :title="event.summary"
        >
          <code>{{ event.summary.split(':')[0] }}</code>
          <small>:</small>
          <span>{{ event.summary.split(':')[1] }}</span>
        </div>
      </div>

    </ModalContainer>
  </div>
</template>

<script>
import ModalContainer from '@/components/shared/modal-container';

export default {
  components: {
    ModalContainer,
  },
  props: {
    events: {
      type: Array,
      default: () => [],
    }
  },
};
</script>

<style>
.summary-wrapper {
  padding: 15px;
  display: flex;
  flex-direction: column;
}
.summary-item-container {
  margin-top: 8px;
  user-select: all;
  position: relative;
  overflow-y: auto;
}

.summary-item {
  padding-bottom: 8px;
  padding-top: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, .025);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.summary-item *::selection {
  background: rgba(255,255,25,0.05); /* WebKit/Blink Browsers */
}

.summary-item code {
  font-family: monospace;
  display: inline-block;
  background: rgba(0, 0, 0, .05);
  border-radius: 4px;
  padding: 2px 4px;
  margin: -2px -4px;
  margin-left: 0;
}
.summary-item small {
  opacity: 0;
}
.summary-item span {

}
</style>
