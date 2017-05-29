<template>
  <div>
    <div class="flex">
      <h1>ToDoCal</h1>
      <input/>
      <div class="col authentication">
        <button
          v-on:click="update"
          v-if="isSignedIn">
          Load
        </button>

        <!--Add buttons to initiate auth sequence and sign out-->
        <button v-on:click="signOut" v-if="isSignedIn">Sign Out</button>
        <button v-on:click="signIn"  v-else>Sign In</button>
      </div>
    </div>

    <div class="parent-container flex">
      <div class="tasks-container flex">
        <tasks-list :tasks="tasks"></tasks-list>
        <div class="progress-list">

        </div>
      </div>
      <div class="calendar-container flex">
        <div class="calendar-view">
          <events-list :events="events"></events-list>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import gaHelper from '@/libs/gaHelper/index';
import taskList from '@/components/TaskList';
import eventList from '@/components/EventList';

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
    'tasks-list': taskList,
    'events-list': eventList,
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

<style>
.flex {
  display: flex;
}
</style>

<style scoped>

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

.tasks-list,
.progress-list,
.calendar-view {
  width: 100%;
  background-color: lightcyan;
  height: 300px;
  border: 2px solid white;
  box-shadow: inset 0 0 1px 1px rgba(0,0,0,0.05);
  box-sizing: border-box;
}

</style>
