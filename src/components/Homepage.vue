<template>
  <div class="main container">
    <div class="navigation">
      <div class="col">
        <div class="brand">
          ToDoCal
        </div>
      </div>
      <div class="col authentication">
        <button v-on:click="update"
                v-if="isSignedIn">
          Load
        </button>

        <!--Add buttons to initiate auth sequence and sign out-->
        <button v-on:click="signOut" v-if="isSignedIn">Sign Out</button>
        <button v-on:click="signIn"  v-else>Sign In</button>
      </div>
    </div>

    <div v-if="isSignedIn">
      <div ref="command-form">
        <input v-on:keyup.enter="submit"
               class="command-form__input"
               placeholder="Type commands here...">
        <div ref="command-form__history"
             class="command-form__history">
          Previously entered command will be shown here.
        </div>
      </div>

      <div class="calendar__container">
        <event-item
          v-for="event in events"
          :key="event.id"
          :event="event">
        </event-item>
        <div v-if="events.length == 0" class="calendar__empty-state">
          <p>No event here!</p>
          <p>Seems like you have nothing to do for the rest of the day!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gaHelper from '@/libs/gaHelper/index';
import InputParser from '@/libs/InputParser';
import Commander from '@/libs/Commander';
import eventVue from '@/components/Event';

const inputParser = new InputParser();
const commander = new Commander();

export default {
  name: 'homepage',
  data() {
    return {
      isSignedIn: false,
      events: [],
    };
  },
  methods: {
    signIn: gaHelper.auth.signIn,
    signOut: gaHelper.auth.signOut,
    update() {
      gaHelper.events.list('primary')
      .then((events) => {
        this.events = events;
      });
    },
    submit(event) {
      event.preventDefault();
      const value = event.target.value;
      event.target.value = '';
      this.$refs['command-form__history'].textContent = value;

      const actionPackage = inputParser.parse(value);
      commander.execute(actionPackage)
      .then((response) => {
        setTimeout(() => {
          this.update();
        }, 2000);
      });
    }
  },
  components: {
    'event-item': eventVue
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

.calendar__empty-state {
  padding: 0 12px;
}

.command-form__input {
  width: 100%;
  font-size: 1.2em;
  margin: 10px 0;
  padding: 10px;
  box-sizing: border-box;
}
.command-form__history {
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
