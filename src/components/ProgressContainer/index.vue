<template>
  <div class="progress-container">
    <h2>Progress</h2>
    <task-list :tasks="tasks"></task-list>
  </div>
</template>

<script>
import taskListVue from '@/components/TodoContainer/TaskList';

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
