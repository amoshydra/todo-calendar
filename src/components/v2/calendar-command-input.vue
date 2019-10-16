<template>
  <form
    class="calendar-command-input"
    @submit.prevent="handleSubmit"
  >
    <input v-model="input" name="input">
  </form>
</template>

<script lang="ts">
import { createComponent, inject, ref } from '@vue/composition-api';
import { TodoCalendarService, TodoCalendarServiceKey } from '~/domain/todo-calendar';
import { InputParser } from '~/domain/todo-calendar/libs/input-parser';
import { CommandExecutor } from '~/domain/todo-calendar/libs/command-executor';

export default createComponent({
  setup() {
    const input = ref('');
    const service = inject(TodoCalendarServiceKey) as TodoCalendarService;
    const inputParser = new InputParser();
    const commandExecutor = new CommandExecutor(service);

    const handleSubmit = () => {
      const value = input.value;
      const detail = inputParser.parse(value);

      if (!detail) { return; }

      input.value = '';
      commandExecutor.exec(detail);
    };

    return {
      input,
      handleSubmit,
    };
  },
});
</script>

<style lang="scss" scoped>
.calendar-command-input input {
  border: 1px solid black;
  padding: 8px;
  font-size: 16px;
  width: 100%;
}
</style>
