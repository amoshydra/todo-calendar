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
      this.$auth.loginWith('google');
    },
  },
};
</script>

<style>

</style>
