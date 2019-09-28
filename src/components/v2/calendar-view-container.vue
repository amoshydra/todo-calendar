<template>
  <div>
    calendar
  </div>
</template>

<script lang="ts">
import { createComponent, inject, ref, watch } from '@vue/composition-api';
import { TodoCalendarService, TodoCalendarServiceKey } from '~/domain/todo-calendar';

export default createComponent({
  setup() {
    const service = inject(TodoCalendarServiceKey) as TodoCalendarService;
    const events = ref<gapi.client.calendar.Event[]>([]);
    const startDate = ref<Date>(new Date('2019-09-26T00:00:00.000+0800'));
    const endDate = ref<Date>(new Date('2019-09-27T00:00:00.000+0800'));

    watch(async () => {
      events.value = await service.events.list({
        calendarId: 'primary',
        start: startDate.value,
        end: endDate.value,
      }) || [];
    });

    return {
      events,
      startDate,
      endDate,
    };
  },
});
</script>
