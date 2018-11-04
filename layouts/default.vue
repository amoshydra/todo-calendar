<template>
  <main class="main">
    <nuxt/>
  </main>
</template>

<style>
/* TODO: Use this, as nuxt css has a bug ordering app styling */
@import url('reset-css');
@import url('@/assets/css/main.css');

main.main {
  padding: 16px;
  max-width: 1440px;
  margin: auto;
}
</style>
