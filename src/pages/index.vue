<template>
  <section class="container">
    <div class="index__input">
      <command-input-wrapper />
    </div>
    <div class="index__calendar">
      <calendar-view-wrapper />
    </div>

    <div class="index__calendar-sumarizer">
      <calendar-summarizer :events="$store.state.calendar.events" />
    </div>
  </section>
</template>

<script>
import CommandInputWrapper from '@/components/index/command-input-wrapper';
import CalendarViewWrapper from '@/components/index/calendar-view-wrapper';
import CalendarSummarizer from '@/components/index/calendar-summarizer';

export default {
  components: {
    CommandInputWrapper,
    CalendarViewWrapper,
    CalendarSummarizer,
  },
  middleware: 'auth',
};
</script>

<style>
.index__input {
  margin-top: 24px;
}
.index__calendar {
  margin-top: 60px;
}
.index__calendar-sumarizer {
  margin-top: 24px;
  text-align: right;
}
</style>
