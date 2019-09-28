<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import { createComponent, provide } from '@vue/composition-api';
import { TodoCalendarService, TodoCalendarServiceKey } from '~/domain/todo-calendar';

const serviceCache = (() => {
  let cache: TodoCalendarService | null = null;

  return () => {
    if (cache) {
      console.log('returning cached copy');
      return cache;
    }

    console.log('creating todo calendar service');
    cache = new TodoCalendarService({
      google: {
        apiKey: process.env.GOOGLE_API_KEY as string,
        clientId: process.env.GOOGLE_CLIENT_ID as string,
      }
    });
    return cache;
  };
})();

export default createComponent({
  setup() {
    provide(TodoCalendarServiceKey, serviceCache());
  }
});
</script>
