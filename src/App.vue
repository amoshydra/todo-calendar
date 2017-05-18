<template>
  <div id="app">
    <homepage></homepage>
  </div>
</template>

<script>
import homepage from './components/Homepage';

export default {
  name: 'app',
  components: {
    homepage,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
