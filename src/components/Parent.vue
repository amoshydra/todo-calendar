<template>
  <div class="container">
    <div class="flex">
      <h1>ToDoCal</h1>
      <div class="flex authentication">
        <a class="btn" v-on:click="update"  v-if="isSignedIn">Load</a>

        <!--Add buttons to initiate auth sequence and sign out-->
        <a class="btn" v-on:click="signOut" v-if="isSignedIn">Sign Out</a>
        <a class="btn" v-on:click="signIn"  v-else>Sign In</a>
      </div>
    </div>
    <input/>

    <div class="parent-container flex">
      <div class="tasks-container flex">
        <todo-container :tasks="tasks"></todo-container>
        <progress-container :tasks="tasks"></progress-container>
      </div>
      <div class="calendar-container flex">
        <calendar-container :events="events"></calendar-container>
      </div>
    </div>
  </div>

</template>

<script>
import gaHelper from '@/libs/gaHelper/index';
import todoContainer from '@/components/TodoContainer';
import progressContainer from '@/components/ProgressContainer';
import calendarContainer from '@/components/CalendarContainer';

export default {
  name: 'parent',
  data() {
    return {
      events: [],
      tasks: [],
      isSignedIn: false,
    };
  },
  methods: {
    signIn: gaHelper.auth.signIn,
    signOut: gaHelper.auth.signOut,
    update() {
      gaHelper.tasks.list()
      .then((tasks) => {
        this.tasks = tasks;
      });
      gaHelper.events.list('primary')
      .then((events) => {
        this.events = events;
      });
    },
  },
  components: {
    'todo-container': todoContainer,
    'progress-container': progressContainer,
    'calendar-container': calendarContainer,
  },
  mounted() {
    gaHelper.init((signInStatus) => {
      // Update sign in status
      this.isSignedIn = signInStatus;

      // Get upcoming events
      this.update();
    });
  }
};
</script>

<style lang="scss">

body, html {
  margin: 0;
  padding: 0;
}

.container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 15px;
}

.flex {
  display: flex;
}

h1, h2, h3 {
  margin: 0;
}

.parent-container,
.tasks-container,
.calendar-container {
  width: 100%;
  flex-direction: column;
}

@media screen and (min-width: 768px) {
  .parent-container {
    flex-direction: row;
  }

  .tasks-container {    width: 40%; }
  .calendar-container { width: 60%; }
}

.calendar-container,
.progress-container,
.todo-container {
  margin-top: 20px;
  margin-bottom: 40px;
}

</style>

<style lang="scss" scoped>
.authentication {
  margin-left: auto;

  a.btn {
    margin: 6px;
    margin-top: 12px;
    display: inline-block;
    background: none;
    border: none;
    text-decoration: underline;
  }
}

input {
  width: 100%;
  padding: 4px;
  font-size: 1em;
  box-sizing: border-box;
}

</style>
