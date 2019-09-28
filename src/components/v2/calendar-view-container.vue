<template>
  <div>
    calendar
  </div>
</template>

<script lang="ts">
import { createComponent, inject } from '@vue/composition-api';
import { TodoCalendarService, TodoCalendarServiceKey } from '~/domain/todo-calendar';

export default createComponent({
  setup() {
    const service = inject(TodoCalendarServiceKey) as TodoCalendarService;

    (async () => {
      await service.events.list({
        calendarId: 'primary',
        start: new Date(),
        end: new Date(),
      });
    })();

    return {};
  },
});
</script>
