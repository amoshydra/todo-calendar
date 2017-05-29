<template>
  <div class="events-list">
    <event-item
      v-for="event in events"
      :key="event.id"
      :event="event">
    </event-item>
  </div>
</template>

<script>
import eventVue from './Event';

export default {
  data() {
    return {};
  },
  props: ['events'],
  methods: {},
  components: {
    'event-item': eventVue
  },
  mounted() {}
};
</script>

<style scoped>


</style>
