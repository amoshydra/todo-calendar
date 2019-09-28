<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import { createComponent, provide } from '@vue/composition-api';
import { TodoCalendarService, TodoCalendarServiceKey } from '~/domain/todo-calendar';
import googleConfig from '~/../config/google';

const serviceCache = (() => {
  let cache: TodoCalendarService | null = null;

  return () => {
    if (cache) { return cache; }

    cache = new TodoCalendarService({
      google: {
        apiKey: googleConfig.apiKey,
        clientId: googleConfig.clientId,
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
