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
import { createComponent, inject, ref, Ref, computed } from '@vue/composition-api';
import CalendarViewAgendaPresenter from './calendar-view-agenda-presenter.vue';
import CalendarDateNavigationInput from './calendar-date-navigation-input.vue';
import { TodoCalendarService, TodoCalendarServiceKey } from '~/domain/todo-calendar';
import { getView, add } from '~/data-stores/events';

const sortEventByStartTime = (a: gapi.client.calendar.Event, b: gapi.client.calendar.Event) => (
  (new Date((a.start && a.start.dateTime) as string)).valueOf() -
  (new Date((b.start && b.start.dateTime) as string)).valueOf()
);

interface DatePackage {
  start: Date,
  end: Date,
}

const filterBetweenDate = ({ start, end }: DatePackage) => (event: gapi.client.calendar.Event) => {
  const startDateString = (event.start && event.start.dateTime);
  const endDateString = (event.end && event.end.dateTime);

  if (!(
    startDateString &&
    endDateString &&
    start &&
    end
  )) { return false; }

  return (
    Date.parse(startDateString) >= start.valueOf() &&
    Date.parse(endDateString) <= end.valueOf()
  );
};

export default createComponent({
  components: {
    CalendarDateNavigationInput,
    CalendarViewAgendaPresenter,
  },
  setup() {
    const service = inject(TodoCalendarServiceKey) as TodoCalendarService;
    const dates = ref<DatePackage>({
      start: null,
      end: null,
    });

    const events = computed(() => {
      const id = `day-view-${dates.value.start && dates.value.start.valueOf()}`;
      return getView(id, (events: gapi.client.calendar.Event[]) => events
        .filter(event => event.status !== 'cancelled')
        .filter(filterBetweenDate(dates.value))
        .sort(sortEventByStartTime)
      );
    });

    const handleDateChanged = async (changedDates: Ref<DatePackage>) => {
      dates.value = changedDates.value;
      const newEvents = (await service.events.list({
        calendarId: 'primary',
        start: dates.value.start,
        end: dates.value.end,
      }));
      add(newEvents);
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
