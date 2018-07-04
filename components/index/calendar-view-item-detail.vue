<template>
  <div
    v-if="selectedEvent"
    class="calendar-view-item-detail"
    tabindex="0"
    autofocus
  >
    <h4>{{ event.summary }}</h4>

    <div class="item-detail__item">
      <strong>Duration:</strong>&nbsp;<span>{{ duration }}</span>
    </div>
    <div
      class="item-detail__item item-detail__description"
      v-if="event.description"
      v-html="event.description"
    ></div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    selectedEvent: {
      type: Object,
    },
  },
  computed: {
    event() {
      return (this.selectedEvent && this.selectedEvent.data) || {};
    },
    duration() {
      const durationMiliseconds = this.selectedEvent.end.valueOf() - this.selectedEvent.start.valueOf();
      return moment.duration(durationMiliseconds).humanize();
    },
  },
  methods: {

  },
};
</script>

<style>
.calendar-view-item-detail {
  padding: 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.item-detail__item {
  margin-top: 1em;
}
.item-detail__description {
  padding: 16px 8px;
  background: rgba(0,0,0,0.025);
  max-height: 100%;
  overflow-y: auto;
  white-space: pre-wrap;
}
.item-detail__description ul {
  padding-left: 1em;
}
</style>
