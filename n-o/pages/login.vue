<template>
  <div>
    <button
      @click="login"
    >
      Login
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      $auth.loginWith('google');
    },
  },
};
</script>

<style>

</style>
