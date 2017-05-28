<template>
  <div id="app">
    <parent></parent>
  </div>
</template>

<script>
import parent from './components/Parent';

export default {
  name: 'app',
  components: {
    parent,
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
