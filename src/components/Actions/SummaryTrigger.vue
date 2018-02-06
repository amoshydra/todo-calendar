<template>
  <div class="summary-trigger">
    <a @click="toggle">{{ !show ? 'View' : 'Hide' }} summary</a>

    <div v-if="show">
      <pre v-html="summaryList"></pre>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  computed: {
    summaryList() {
      const yersterday = this.$store.state.events[-1].map(event => event.summary).join('\n');
      const today = this.$store.state.events[0].map(event => event.summary).join('\n');
      return `${yersterday}\n---\n${today}`;
    },
  },
  methods: {
    toggle() {
      this.show = !this.show;
    },
  },
};
</script>

<style lang="scss">
.summary-trigger {
  margin-top: 6px;

  a {
    cursor: pointer;
  }
}

</style>
