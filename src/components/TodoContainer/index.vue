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

<style lang="scss">
// Common class
.sketch__container {
  border: 2px solid #2c3e50;
  border-radius: 1px;
  box-shadow: 0 0 1px 0 rgba(0,0,0,0.5);
  background: gray;
  overflow-y: scroll;
  height: 600px;

  .sketch__item {
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.05);
    padding: 12px;
    padding-bottom: 24px;
    color: #828284;
    transition: transform  0.125s,
                box-shadow 0.125s;
  }
}
</style>
