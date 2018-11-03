<template>
  <div class="page__login">

    <div class="page__login__intro">
      <h1 class="brand__title">To-do Calendar</h1>
      <AppLoginBrandTagline
        tagName="h2"
        :lines="['Where To-do meets', 'calendar']"
      />
    </div>

    <AppLoginButton>
      Get started with your Google Calendar
    </AppLoginButton>
  </div>
</template>

<script>
import AppLoginButton from '@/components/app-login-button';
import AppLoginBrandTagline from '@/components/app-login-brand-tagline';

export default {
  components: {
    AppLoginButton,
    AppLoginBrandTagline,
  },
};
</script>

<style scoped>
.page__login__intro {
  font-size: 2em;
  margin-bottom: 80px;
  padding-top: 32px;
}
.page__login__intro >>> .app-login-brand-tagline {
  font-size: 1em;
}

.brand__title {
  font-family: 'Montserrat', sans-serif;
  line-height: 1em;
  margin-bottom: 0.5em;
}
</style>
