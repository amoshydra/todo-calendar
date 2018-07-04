<template>
  <div class="page__login">

    <div class="page__login__intro">
      <h1 class="brand__title">To-do Calendar</h1>
      <h4 class="brand__tagline">
        <vue-typer
          :pre-type-delay='1000'
          :type-delay='80'
          text='Where To-do meet '
          :repeat='0'
        ></vue-typer>
        <span style="display: inline-block">
          <vue-typer
            :pre-type-delay='1000 + (17 * 80)'
            text='calendar'
            :repeat='0'
          ></vue-typer>
        </span>
      </h4>
    </div>

    <button
      @click="login"
      class="login__button"
    >
      <span>Get started with your Google Calendar</span>
    </button>
  </div>
</template>

<script>
import { VueTyper } from 'vue-typer';

export default {
  components: {
    VueTyper,
  },
  methods: {
    login() {
      this.$auth.loginWith('google');
    },
  },
};
</script>

<style scoped>

.page__login__intro {
  font-size: 2em;
  margin-bottom: 80px;
  padding-top: 32px;
}

.brand__title {
  font-family: 'Montserrat', sans-serif;
  line-height: 1em;
  margin-bottom: 0.5em;
}
.brand__tagline {
  opacity: 0.4;
  font-weight: 900;
  min-height: 3em;
}
.brand__tagline >>> span {
  font-family: 'Kalam', cursive;
  line-height: 1.2em;
}

.login__button {
  /* Reset button */
  border: none;
  font: inherit;
  outline: none;

  max-width: 280px;
  cursor: pointer;
  color: #1e1e1e;
  background-color: #FEFEFE;
  padding: 0.75em 1.25em;
  box-shadow: 0px 0px 1px 0 rgba(0,0,0,0.1);
  transition:
    box-shadow 0.25s,
    transform 0.25s,
    background-color 0.1s;
    ;
}
.login__button:focus,
.login__button:hover {
  box-shadow: 0px 12px 24px 0 rgba(0,0,0,0.1);
  transform: translateY(-4px);
  background-color: #47ff86;
}

.login__button:active {
  transform: translateY(-3px);
  box-shadow: 0px 02px 20px 0 rgba(0,0,0,0.1);
}
.login__button span {
  display: inline-block;
  text-align: left;
  line-height: 1.5em;
  font-size: 1.25em;
  font-weight: 900;
  user-select: none;
  transition:
    transform 0.1s,
    ;
}

</style>
