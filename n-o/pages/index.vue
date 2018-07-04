<template>
  <section class="container">
    <div class="index__input">
      <command-input-wrapper/>
    </div>
    <div class="index__calendar">
      <calendar-view-wrapper />
    </div>
  </section>
</template>

<script>
import CommandInputWrapper from "@/components/index/command-input-wrapper";
import CalendarViewWrapper from "@/components/index/calendar-view-wrapper";

export default {
  components: {
    CommandInputWrapper,
    CalendarViewWrapper,
  },
  middleware: 'auth',
}
</script>

<style>
.index__input {
  margin-top: 24px;
}
.index__calendar {
  margin-top: 60px;
}

</style>
