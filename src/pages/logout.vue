<template>
  <div>Logging out</div>
</template>

<script>
import Vue from 'vue';
export default Vue.extend({
  mounted() {
    this.$auth.logout();
  }
});
</script>
