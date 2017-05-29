<template>
  <div class="calendar-container">
    <h2>Today</h2>
    <event-list :events="events"></event-list>
  </div>
</template>

<script>
import eventListVue from './EventList';

export default {
  data() {
    return {};
  },
  props: ['events'],
  components: {
    'event-list': eventListVue
  },
};
</script>
