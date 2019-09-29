<template>
  <div class="calendar-view-container">
    <CalendarViewAgendaPresenter
      class="calendar-view-agenda-presenter"
      :events="events"
    />
  </div>
</template>

<script lang="ts">
import { createComponent, inject, ref, watch } from '@vue/composition-api';
import CalendarViewAgendaPresenter from './calendar-view-agenda-presenter.vue';
import { TodoCalendarService, TodoCalendarServiceKey } from '~/domain/todo-calendar';

const sortEventByStartTime = (a: gapi.client.calendar.Event, b: gapi.client.calendar.Event) => (
  (new Date((a.start && a.start.dateTime) as string)).valueOf() -
  (new Date((b.start && b.start.dateTime) as string)).valueOf()
);

export default createComponent({
  components: {
    CalendarViewAgendaPresenter,
  },
  setup() {
    const service = inject(TodoCalendarServiceKey) as TodoCalendarService;
    const events = ref<gapi.client.calendar.Event[]>([]);

    const params: any = location.search.substring(1).split('&').map(x => x.split('=')).reduce((a, x) => ({ ...a, [x[0]]: x[1] }), {});
    const [month, day] = (
      (params.s || '').split('-') ||
      [new Date().getMonth() + 1, new Date().getDate()]
    )
      .map((x: string) => parseInt(x, 10))
    ;

    const startDate = ref<Date>(new Date(`2019-${`${month}`.padStart(2, '0')}-${`${day}`.padStart(2, '0')}T00:00:00.000+0800`));
    const endDate = ref<Date>(new Date(`2019-${`${month}`.padStart(2, '0')}-${`${day + 1}`.padStart(2, '0')}T00:00:00.000+0800`));

    watch(async () => {
      events.value = (await service.events.list({
        calendarId: 'primary',
        start: startDate.value,
        end: endDate.value,
      }))
        .map(x => x)
        .sort(sortEventByStartTime)
      ;
    });

    return {
      events,
      startDate,
      endDate,
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
