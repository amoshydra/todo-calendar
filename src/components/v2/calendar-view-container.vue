<template>
  <div>
    <CalendarCommandInput
      :range="dates"
    />
    <CalendarDateNavigationInput
      @input="handleDateChanged"
    />
    <div class="calendar-view-container">
      <CalendarViewAgendaPresenter
        class="calendar-view-agenda-presenter"
        :events="events"
        @input="handleEventUpdated"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, inject, ref, Ref, computed } from '@vue/composition-api';
import CalendarViewAgendaPresenter from './calendar-view-agenda-presenter.vue';
import CalendarDateNavigationInput from './calendar-date-navigation-input.vue';
import CalendarCommandInput from './calendar-command-input.vue';
import { TodoCalendarService, TodoCalendarServiceKey } from '~/domain/todo-calendar';
import { getView, add } from '~/data-stores/events';

interface DateRange {
  start: Date,
  end: Date,
}

export default createComponent({
  components: {
    CalendarDateNavigationInput,
    CalendarViewAgendaPresenter,
    CalendarCommandInput,
  },
  setup() {
    const service = inject(TodoCalendarServiceKey) as TodoCalendarService;
    const dates = ref<DateRange>({
      start: null,
      end: null,
    });

    const events = computed(() => getView(dates.value));

    const handleDateChanged = async (changedDates: Ref<DateRange>) => {
      dates.value = changedDates.value;
      const newEvents = (await service.events.list({
        calendarId: 'primary',
        start: dates.value.start,
        end: dates.value.end,
      }));
      add(newEvents);
    };

    interface EventWithDateTimes {
      id: string
      start: { dateTime: string }
      end: { dateTime: string }
    }
    const handleEventUpdated = async (updatedEvent: EventWithDateTimes) => {
      const event = await service.events.update({
        calendarId: 'primary',
        eventId: updatedEvent.id as string,
        resource: {
          end: {
            dateTime: updatedEvent.end && updatedEvent.end.dateTime as string
          }
        },
      });

      add(event);
    };

    return {
      events,
      dates,

      handleDateChanged,
      handleEventUpdated,
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
