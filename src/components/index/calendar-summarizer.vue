<template>
  <div
    class="command-summarizer"
  >
    <a
      href="javascript:void(0)"
      @click="$refs.modal.show()"
    >Show summary</a>

    <ModalContainer
      ref="modal"
      target-class="summary-wrapper"
    >
      <h4>Summary</h4>
      <div class="summary-item-container">
        <CalendarSummarizerItem
          v-for="event in filteredSortedEvents"
          :key="event.id"
          class="summary-item"
          :event="event"
        />
      </div>
    </ModalContainer>
  </div>
</template>

<script>
import CalendarSummarizerItem from './calendar-summarizer-item';
import ModalContainer from '@/components/shared/modal-container';

export default {
  components: {
    ModalContainer,
    CalendarSummarizerItem,
  },
  props: {
    events: {
      type: Array,
      default: () => [],
    }
  },
  computed: {
    filteredSortedEvents() {
      const uniqSummary = {};
      return [...this.events]
        .reduce((acc, event) => {
          if (uniqSummary[event.summary]) {
            return acc;
          }
          uniqSummary[event.summary] = true;
          acc.push(event);
          return acc;
        }, [])
        .sort((a, b) => (
          new Date(a.end.dateTime || a.start.dateTime)
          - new Date(b.end.dateTime || b.start.dateTime)
        ))
      ;
    },
  }
};
</script>

<style>
.command-summarizer > a {
  color: black;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  transition: border-bottom 0.2s;
}
.command-summarizer > a:hover {
  border-bottom: 1px solid rgba(0,0,0,0.5);
}

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
