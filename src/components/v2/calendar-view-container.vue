<template>
  <div>
    <CalendarDateNavigationInput
      @input="handleDateChanged"
    />
    <div class="calendar-view-container">
      <CalendarViewAgendaPresenter
        class="calendar-view-agenda-presenter"
        :events="events"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, inject, ref, Ref } from '@vue/composition-api';
import CalendarViewAgendaPresenter from './calendar-view-agenda-presenter.vue';
import CalendarDateNavigationInput from './calendar-date-navigation-input.vue';
import { TodoCalendarService, TodoCalendarServiceKey } from '~/domain/todo-calendar';

const sortEventByStartTime = (a: gapi.client.calendar.Event, b: gapi.client.calendar.Event) => (
  (new Date((a.start && a.start.dateTime) as string)).valueOf() -
  (new Date((b.start && b.start.dateTime) as string)).valueOf()
);

export default createComponent({
  components: {
    CalendarDateNavigationInput,
    CalendarViewAgendaPresenter,
  },
  setup() {
    const service = inject(TodoCalendarServiceKey) as TodoCalendarService;
    const events = ref<gapi.client.calendar.Event[]>([]);

    const handleDateChanged = async (dates: Ref<{ start: Date, end: Date }>) => {
      events.value = (await service.events.list({
        calendarId: 'primary',
        start: dates.value.start,
        end: dates.value.end,
      }))
        .map(x => x)
        .sort(sortEventByStartTime)
      ;
    };

    return {
      events,
      handleDateChanged,
    };
  },
});
</script>

<style lang="scss" scoped>
.calendar-view-container {
  border: 1px solid black;
  padding-left: 16px;
}
.calendar-view-agenda-presenter {
  height: calc(100vh - 200px);
  overflow-y: scroll;
  padding-bottom: 32px;
}
</style>
