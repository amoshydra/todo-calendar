<template>
  <div class="main container">
    <div class="navigation">
      <div class="col">
        <div class="brand">  
          ToDo - Cal
        </div>
      </div>
      <div class="col authentication">
        <button v-on:click="update">Load</button>

        <!--Add buttons to initiate auth sequence and sign out-->
        <button v-on:click="signOut" v-if="isSignedIn">Sign Out</button>
        <button v-on:click="signIn"  v-else>Sign In</button>
      </div>
    </div>

    <form ref="command-form">
      <input class="command-input" placeholder="Type commands here...">
      <div class="command-history">Previously entered command will be shown here.</div>
    </form>

    <div class="calendar__container">
      <div v-for="event in processed" class="calendar__item">
        <div>
          <div class="content date-time">{{ event.todoCal.start.dateTime }}</div>
          <div class="content date-time">{{ event.todoCal.end.dateTime }}</div>
        </div>
        <div class="content">{{ event.summary }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Vue from 'vue';
import gaHelper from '@/libs/gaHelper/index';

export default {
  name: 'homepage',
  data() {
    return {
      isSignedIn: false,
      events: [],
    };
  },
  methods: {
    signIn: gaHelper.signIn,
    signOut: gaHelper.signOut,
    update: function update() {
      gaHelper.listUpcomingEvents()
      .then((events) => {
        this.events = events;
      });
    }
  },
  computed: {
    processed() {
      this.events.forEach((event) => {
        event.todoCal = {
          start: { dateTime: moment(event.start.dateTime).startOf('hour').fromNow() },
          end: { dateTime: moment(event.end.dateTime).startOf('hour').fromNow() }
        };
      });
      return this.events;
    }
  },
  mounted() {
    gaHelper.init((signInStatus) => {
      // Update sign in status
      this.isSignedIn = signInStatus;

      // Get upcoming events
      this.update();
    });

    const commandForm = this.$refs['command-form'];
    const inputField = commandForm.querySelector('.command-input');
    const inputHistory = commandForm.querySelector('.command-history');
    commandForm.addEventListener('submit', (event) => {
      event.preventDefault();
      inputHistory.textContent = inputField.value;
      inputField.value = '';
    });
  }
};
</script>

<style scoped>
body {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
}

.container {
  width: 768px;
  max-width: 100%;
  margin: 0 auto;
}

.calendar__container {
  padding-left: 0;
  margin-top: 24px;
  margin-bottom: 96px;
}

.calendar__item {
  display: flex;
  border-top: 1px solid rgba(0,0,0,0.1);
  padding: 12px 0;
}
.calendar__item:last-child {
  border-bottom: 1px solid rgba(0,0,0,0.1);
}

.calendar__item:hover {
  background: rgba(0,0,0,0.02);
}

.calendar__item .content {
  padding: 2px 5px;
}

.calendar__item .content.date-time {
  width: 85px;
  font-size: 0.75em;
}

.command-input {
  width: 100%;
  font-size: 1.2em;
  margin: 10px 0;
  padding: 10px;
  box-sizing: border-box;
}
.command-history {
  font-size: 0.65em;
  opacity: 0.5;
  margin-left: 12px;
}

.col {
  display: inline-block;
  width: calc(50% - 3px);
  vertical-align: middle;
}

.navigation {
  padding: 8px;
  padding-top: 96px;
  margin-bottom: 24px;
}

.brand {
  font-size: 3em;
}

.authentication {
  text-align: right;
}

.authentication button {
  border: none;
  background-color: #efefef;
  padding: 12px;
}
</style>
