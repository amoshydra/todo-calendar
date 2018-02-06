<template>
  <div class="container">
    <div class="flex">
      <h1>ToDoCal</h1>
      <div class="flex authentication" :data-signed-in="'' + isSignedIn">
        <a class="btn" v-on:click="update"  v-if="isSignedIn">Load</a>

        <!--Add buttons to initiate auth sequence and sign out-->
        <a class="btn">
          <span v-on:click="signOut"  v-if="isSignedIn">Sign Out</span>
          <span v-on:click="signIn" v-else>Sign In</span>
        </a>
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

      <div class="parent-container flex">
        <div
          class="calendar-container flex"
          :style="{ width: `${ratio}px` }"
        >
          <calendar-container
            :events="events[0]"
          ></calendar-container>
          <summary-trigger />
        </div>
        
        <column-resizer v-model="ratio"/>

        <div
          class="tasks-container flex"
          :style="{ width: `calc(100% - ${ratio}px)` }"
        >
          <todo-container
            :tasks="tasks"
          ></todo-container>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gaHelper from '@/libs/gaHelper/index';
import InputParser from '@/libs/InputParser';
import Commander from '@/libs/Commander';

import TodoContainer from '@/components/TodoContainer';
import ProgressContainer from '@/components/ProgressContainer';
import CalendarContainer from '@/components/CalendarContainer';
import SummaryTrigger from '@/components/Actions/SummaryTrigger';
import ColumnResizer from '@/components/Actions/ColumnResizer';

const APP_DETECTION_REGEX = /^(.*):/;

const inputParser = new InputParser();
const commander = new Commander();

export default {
  name: 'parent',
  data() {
    return {
      tasks: [],
      isSignedIn: false,
      ratio: 200,
    };
  },
  computed: {
    events() {
      return this.$store.state.events;
    },
  },
  methods: {
    signIn: gaHelper.auth.signIn,
    signOut: gaHelper.auth.signOut,
    update() {
      gaHelper.tasks.list()
      .then((tasks) => {
        this.tasks = tasks;
      });
      this.$store.dispatch('events/retrieve');
    },
    submit(event) {
      event.preventDefault();
      const value = event.target.value;

      const matches = value.match(APP_DETECTION_REGEX);

      if (matches && matches[1]) {
        event.target.value = `${matches[1]}: `;
      } else {
        event.target.value = '';
      }

      this.$refs['command-form__history'].textContent = value;

      const actionPackage = inputParser.parse(value);
      commander.execute(actionPackage)
      .then((response) => {
        this.$nextTick(() => {
          this.update();
        });
      });
    },
  },
  components: {
    TodoContainer,
    ProgressContainer,
    CalendarContainer,

    SummaryTrigger,
    ColumnResizer,
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

body {
  background-color: rgba(119, 136, 153, 0.1);
}

.container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 15px;
  margin: 0px 5px;

  @media screen and (min-width: 480px) {
    margin: 0px auto;
  }
}

.flex {
  display: flex;
}

h1, h2, h3 {
  margin: 0;
}
h2 {
  margin-bottom: 12px;
}


.parent-container,
.tasks-container,
.calendar-container {
  flex-direction: column;
}
.parent-container {
  margin-left: -20px;
  width: 100%;
}

@media screen and (min-width: 768px) {
  .parent-container {
    flex-direction: row;
  }
}
@media screen and (max-width: 768px) {
  .tasks-container {    width: 100% !important; }
  .calendar-container { width: 100% !important; }
  .column-resizer { display: none; }
}

.calendar-container,
.progress-container,
.tasks-container {
  margin: 20px;
  margin-bottom: 40px;
}

</style>

<style lang="scss" scoped>
.authentication {
  margin-left: auto;

  a.btn {
    margin: 6px;
    margin-right: 0;
    margin-top: 12px;
    display: inline-block;
    background: none;
    border: none;
    text-decoration: underline;
    transition: all 1s;
  }

  &[data-signed-in="false"] {
    transition: all 1s;
    width: 180px;
    border: 4px solid #2c3e50;
    transform: translate(calc(-50vw + 50% + 30px), 30vh);
    text-transform: uppercase;
    font-weight: 500;

    a {
      transition: all 1s;
      padding: 10px 30px 15px 48px;
      text-decoration: none;
      font-size: 1.2em;
    }
  }
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

</style>
