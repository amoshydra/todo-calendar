<template>
  <div class="entry-presenter">
    <div class="time">
      <div>{{ startTime }}</div>
      <div class="time-beam" />
      <div>{{ endTime }}</div>
    </div>
    <div class="summary">
      {{ summary }}
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api';

const extractHourAndMinute = (dateTime: string) => {
  const time = new Date(dateTime);
  return (
    `${time.getHours()}`.padStart(2, '0') +
    ':' +
    `${time.getMinutes()}`.padStart(2, '0')
  );
};

export default createComponent({
  props: {
    event: Object
  },
  setup(props: { event: gapi.client.calendar.Event }) {
    const startTime = computed(() => {
      const dateTime = (props.event.start && props.event.start.dateTime) as string;
      return extractHourAndMinute(dateTime);
    });
    const endTime = computed(() => {
      const dateTime = (props.event.end && props.event.end.dateTime) as string;
      return extractHourAndMinute(dateTime);
    });

    return {
      startTime,
      endTime,
      summary: props.event.summary,
    };
  }
});
</script>

<style lang="scss" scoped>
.entry-presenter {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: auto 1fr;
  border-radius: 0.25em;
  border: 1px solid rgba(0,0,0,0.15);

}

.time {
  font-size: 0.8em;
  font-family: monospace;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0px 8px;
  justify-content: space-between;
  background: rgba(0,0,0,0.05);
  border-right: 1px solid rgba(0,0,0,0.05);
  text-align: center;
  color: rgba(0,0,0,0.5);

  .time-beam {
    height: 100%;
    min-height: 5px;
    width: 1px;
    border: 2px solid rgba(0,0,0,0.005);
    margin: 0 auto;
  }
}
.summary {
  padding: 16px;
  padding-bottom: 48px;
  padding-right: 48px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
