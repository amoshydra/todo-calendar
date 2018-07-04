<template>
  <div
    class="calendar-view-item-detail"
    v-if="selectedEvent"
    tabindex="0"
    autofocus
  >
    <div class="item-detail__details">
      <textarea
        class="item-detail__input"
        :value="event.summary"
        @blur="event => updateEvent({ summary: event.target.value })"
      ></textarea>

      <div class="item-detail__item">
        <strong>Duration:</strong>&nbsp;<span>{{ duration }}</span>
      </div>


      <div
        class="item-detail__item item-detail__description"
        v-if="event.description"
        v-html="event.description"
      ></div>
    </div>

    <div class="item-detail__actions">
      <div>
        <span class="item-detail__action" @click="removeEvent">🗑️</span>
      </div>
      <div>
        <!-- <span class="item-detail__action">💾</span> -->
      </div>
    </div>
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
    updateEvent(updateData = {}) {
      this.$store.dispatch('calendar/update', {
        calendarId: 'primary',
        eventId: this.event.id,
        resource: {
          ...this.event,
          ...updateData,
        },
      });
    },
    removeEvent() {
      this.$store.dispatch('calendar/remove', {
        calendarId: 'primary',
        eventId: this.event.id,
      });
    }
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

.item-detail__details {
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
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

.item-detail__actions {
  display: flex;
  justify-content: space-between;
}

.item-detail__action {
  cursor: pointer;
}

.item-detail__input {
  border: none;
  width: 100%;
  font-size: 1rem;
  line-height: 1.25;
}
</style>
