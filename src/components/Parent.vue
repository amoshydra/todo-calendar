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
        <div class="tasks-container flex">
          <todo-container :tasks="tasks"></todo-container>
        </div>
        <div class="calendar-container flex">
          <calendar-container :events="events"></calendar-container>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gaHelper from '@/libs/gaHelper/index';
import todoContainer from '@/components/TodoContainer';
import progressContainer from '@/components/ProgressContainer';
import calendarContainer from '@/components/CalendarContainer';
import InputParser from '@/libs/InputParser';
import Commander from '@/libs/Commander';

const inputParser = new InputParser();
const commander = new Commander();

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
  width: calc(100% + 40px);
}

// Common class
.sketch__container {
  border: 2px solid #2c3e50;
  border-radius: 1px;
  box-shadow: 0 0 1px 0 rgba(0,0,0,0.5);
  background: gray;

  .sketch__item {
    background: white;
    border: 2px solid #2c3e50;
    padding: 12px;
    padding-bottom: 24px;
    font-weight: 600;
    color: #828284;
    transition: transform  0.125s,
                box-shadow 0.125s;
  }
  .sketch__item:active {
    transform: scale(1.05);
    box-shadow: 0px 0px 200px 1px rgba(0, 0, 0, 0.1);
  }
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
