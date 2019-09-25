<template>
  <button
    class="login__button"
    @click="handleClick"
  >
    <span><slot>Login</slot></span>
  </button>
</template>

<script>
export default {
  methods: {
    handleClick() {
      if (this.$auth.loggedIn) {
        return this.$router.push(this.$auth.options.redirect.home);
      }

      return this.$auth.loginWith('google');
    }
  }
};
</script>

<style>
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
