<template>
  <div class="calendar-view-container">
    <CalendarViewAgendaPresenter
      class="calendar-view-agenda-presenter"
      :events="events"
    />
  </div>
</template>

<script lang="ts">
import { createComponent, inject, ref, watch, Ref } from '@vue/composition-api';
import CalendarViewAgendaPresenter from './calendar-view-agenda-presenter.vue';
import { TodoCalendarService, TodoCalendarServiceKey } from '~/domain/todo-calendar';
import { parse } from '~/utilities/url-queries';

const sortEventByStartTime = (a: gapi.client.calendar.Event, b: gapi.client.calendar.Event) => (
  (new Date((a.start && a.start.dateTime) as string)).valueOf() -
  (new Date((b.start && b.start.dateTime) as string)).valueOf()
);

const getDates = (search: string, target: string) => {
  const dateQuery = parse(search)[target] || '';
  const splitant = dateQuery.split('-');
  const today = new Date();
  const [month, thisDay, nextDay] = [
    splitant[0] || today.getMonth() + 1,
    splitant[1] || today.getDate(),
    splitant[2] || today.getDate() + 1,
  ]
    .map(x => `${x}`.padStart(2, '0'))
  ;

  return ref<{ start: Date, end: Date }>({
    start: new Date(`2019-${month}-${thisDay}T00:00:00.000+0800`),
    end: new Date(`2019-${month}-${nextDay}T00:00:00.000+0800`),
  });
};

export default createComponent({
  components: {
    CalendarViewAgendaPresenter,
  },
  setup() {
    const service = inject(TodoCalendarServiceKey) as TodoCalendarService;
    const events = ref<gapi.client.calendar.Event[]>([]);

    const dates = getDates(location.search, 's');

    watch(async () => {
      events.value = (await service.events.list({
        calendarId: 'primary',
        start: dates.value.start,
        end: dates.value.end,
      }))
        .map(x => x)
        .sort(sortEventByStartTime)
      ;
    });

    return {
      events,
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
