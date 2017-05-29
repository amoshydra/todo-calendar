<template>
  <div class="calendar__item">
    <div>
      <div class="content date-time">{{ startTime }}</div>
      <div class="content date-time">{{ endTime }}</div>
    </div>
    <div class="content">{{ event.summary }}</div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {};
  },
  props: ['event'],
  computed: {
    startTime() {
      return moment(this.event.start.dateTime).fromNow();
    },
    endTime() {
      return moment(this.event.end.dateTime).fromNow();
    },
  },
};
</script>

<style scoped>
.calendar__item {
  display: flex;
  border-top: 1px solid rgba(0,0,0,0.1);
  padding: 12px 0;
}
.calendar__item:last-child {
  border-bottom: 1px solid rgba(0,0,0,0.1);
}

.calendar__item:hover {
  background: rgba(0,0,0,0.02);
}

.calendar__item .content {
  padding: 2px 5px;
}

.calendar__item .content.date-time {
  width: 85px;
  font-size: 0.75em;
}
</style>
