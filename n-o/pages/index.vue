<template>
  <section class="container">
    <div>
      <input>
    </div>
    <div>
      <calendar-view-wrapper
        :events="$store.state.calendar.events"
      />
    </div>
  </section>
</template>

<script>
import CalendarViewWrapper from "@/components/index/calendar-view-wrapper";

export default {
  components: {
    CalendarViewWrapper
  },
  middleware: 'auth',
  mounted() {
    this.refreshCalendarEventList();
  },
  methods: {
    refreshCalendarEventList() {
      this.$store.dispatch('calendar/list', {
        startOffset: -7,
        endOffset: 1,
      })
    },
  }
}
</script>

<style>
</style>
