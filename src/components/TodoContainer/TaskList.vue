<template>
  <div class="tasks-list sketch__container">
    <task-item
      v-for="task in tasks"
      :key="task.id"
      :task="task">
    </task-item>
  </div>
</template>

<script>
import taskVue from './Task';

export default {
  data() {
    return {};
  },
  props: ['tasks'],
  methods: {},
  components: {
    'task-item': taskVue
  },
  mounted() {}
};
</script>

<style scoped>


</style>
