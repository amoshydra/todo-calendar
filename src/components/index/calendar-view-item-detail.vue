<template>
  <div
    v-if="selectedEvent"
    class="calendar-view-item-detail"
    tabindex="0"
    autofocus
  >
    <div class="item-detail__details">
      <textarea
        class="item-detail__input"
        :value="event.summary"
        @blur="event => updateEvent({ summary: event.target.value })"
      />

      <div class="item-detail__item">
        <strong>Duration:</strong>&nbsp;<span>{{ duration }}</span>
      </div>

      <quill-editor
        class="item-detail__item item-detail__description"
        :content="event.description"
        :options="editorOption"
        @change="({ html }) => cachedHtml = html"
        @blur="updateEvent(cachedHtml == null ? {} : { description: cachedHtml })"
      />
    </div>

    <div class="item-detail__actions">
      <div>
        <span class="item-detail__action" @click="removeEvent">🗑️</span>
      </div>
      <div>
        <!-- <span class="item-detail__action">💾</span> -->
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import { quillEditor } from 'vue-quill-editor';

export default {
  components: {
    QuillEditor: quillEditor,
  },
  props: {
    selectedEvent: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      cachedHtml: null,
    };
  },
  computed: {
    event() {
      return (this.selectedEvent && this.selectedEvent.data) || {};
    },
    duration() {
      const durationMiliseconds = this.selectedEvent.end.valueOf() - this.selectedEvent.start.valueOf();
      return moment.duration(durationMiliseconds).humanize();
    },
  },
  created() {
    this.editorOption = {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['clean'] // remove formatting button
        ],
      }
    };
  },
  methods: {
    updateEvent(updateData = {}) {
      this.$store.dispatch('calendar/update', {
        calendarId: 'primary',
        eventId: this.event.id,
        resource: {
          ...this.event,
          ...updateData,
        },
      });
    },
    removeEvent() {
      this.$store.dispatch('calendar/remove', {
        calendarId: 'primary',
        eventId: this.event.id,
      });
    },
  },
};
</script>

<style>
.calendar-view-item-detail {
  padding: 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.item-detail__details {
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}

.item-detail__item {
  margin-top: 1em;
}
.item-detail__description {
  background: rgba(0, 0, 0, .025);
  max-height: 100%;
  overflow-y: auto;
  position: relative;
  height: 100%;
}
.item-detail__description .ql-toolbar {
  position: sticky;
  top: 0;
  z-index: 1;
  background: white;
}

.item-detail__description ul {
  padding-left: 1em;
}

.item-detail__actions {
  display: flex;
  justify-content: space-between;
}

.item-detail__action {
  cursor: pointer;
}

.item-detail__input {
  border: none;
  width: 100%;
  font-size: 1rem;
  line-height: 1.25;
}

</style>
