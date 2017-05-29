<template>
  <div class="todo-container">
    <h2>Tasks</h2>
    <task-list :tasks="tasks"></task-list>
  </div>
</template>

<script>
import taskListVue from './TaskList';

export default {
  data() {
    return {};
  },
  props: ['tasks'],
  components: {
    'task-list': taskListVue
  },
};
</script>
