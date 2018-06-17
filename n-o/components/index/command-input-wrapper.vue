<template>
  <div
    class="command-input-wrappper"
  >
    <input
      v-on:keyup.enter="submit"
      class="command__input"
      type="text"
      placeholder="Type commands here..."
      v-model="input"
    >
  </div>
</template>

<script>
import InputParser from '@/libs/InputParser';
import Commander from '@/libs/Commander';

const APP_DETECTION_REGEX = /^(.*):/;

export default {
  data() {
    this.inputParser = new InputParser();
    this.commander = new Commander({ store: this.$store });
    return {
      input: '',
    };
  },
  methods: {
    submit(event) {
      event.preventDefault();
      const value = event.target.value;

      const matches = value.match(APP_DETECTION_REGEX);

      if (matches && matches[1]) {
        event.target.value = `${matches[1]}: `;
      } else {
        event.target.value = '';
      }

      // this.$refs['command-form__history'].textContent = value;

      const actionPackage = this.inputParser.parse(value);
      this.commander.execute(actionPackage)
        .then((response) => {
          this.$nextTick(() => {
            this.$store.dispatch('calendar/list');
          });
        });
    },
  }
};
</script>

<style>
.command__input {
  width: 100%;
  padding: 1em;
  font-size: 1em;
  border: none;
  box-shadow: 1px 1px 1px 0 rgba(0,0,0,0.1);
}
</style>
