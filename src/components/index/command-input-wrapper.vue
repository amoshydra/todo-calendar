<template>
  <div
    class="command-input-wrappper"
  >
    <input
      ref="input"
      v-model="input"
      class="command__input"
      type="text"
      placeholder="Type commands here..."
      autofocus
      @keyup.up="fillPreviousCommand"
      @keyup.down="fillNextCommand"
      @keyup.enter="submit"
    >
    <div class="emoji-picker">
      <span
        class="emoji-picker__button"
        tabindex="0"
        @click="showEmojiPicker = !showEmojiPicker"
      />
      <keep-alive>
        <picker
          v-if="showEmojiPicker"
          class="emoji-picker__panel"
          native
          :show-preview="true"
          :show-skin-tones="true"
          @select="(({ native }) => input += native)"
        />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { Picker } from 'emoji-mart-vue';
import InputParser from '@/libs/InputParser';
import Commander from '@/libs/Commander';

const APP_DETECTION_REGEX = /^(.*):/;

export default {
  components: {
    Picker,
  },
  data() {
    this.inputParser = new InputParser();
    this.commander = new Commander({ store: this.$store });
    return {
      input: '',
      existingCommand: '',
      commandHistoryCursor: 0,
      showEmojiPicker: false,
    };
  },
  methods: {
    fillCommandWithHistoryCursor() {
      const { history } = this.$store.state.command;
      this.input = history[history.length - this.commandHistoryCursor] || '';
    },
    fillNextCommand() {
      this.commandHistoryCursor = Math.max(0, this.commandHistoryCursor - 1);
      this.fillCommandWithHistoryCursor();
    },
    fillPreviousCommand() {
      this.commandHistoryCursor = Math.min(this.$store.state.command.history.length, this.commandHistoryCursor + 1);
      this.fillCommandWithHistoryCursor();
    },

    submit(event) {
      event.preventDefault();
      const value = this.input;

      const matches = value.match(APP_DETECTION_REGEX);

      if (matches && matches[1]) {
        this.input = `${matches[1]}: `;
      } else {
        this.input = '';
      }

      this.$store.commit('command/add', value);

      const actionPackage = this.inputParser.parse(value);
      this.commander.execute(actionPackage);
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

.command__history {
  padding: 16px;
  font-size: 0.8em;
  opacity: 0.8;
  font-family: monospace;
  display: inline-block;
}

.command-input-wrappper {
  position: relative;
}
.emoji-picker {
  position: absolute;
  right: 0;
  top: 0;
}

.emoji-picker__button {
  padding: 16px;
  display: block;
  cursor: pointer;
}

.emoji-picker__button::before {
  content: '🙂';
  display: inline-block;
  transition: transform 0.2s;
}
.emoji-picker__button:hover::before {
  content: '😃';
}
.emoji-picker__button:active::before {
  content: '😣';
}

.emoji-picker__panel {
  z-index: 1010;
  position: absolute;
  right: 0;
}
</style>
