<template>
  <div class="calendar-view-agenda">
    <CalendarViewAgendaEntryPresenter
      v-for="(event, index) in events"
      :key="event.id"
      tabindex="-1"
      :style="transformStyle[index]"
      class="agenda-entry"
      :event="event"
    />
  </div>
</template>

<script lang="ts">
import { createComponent, computed, ref } from '@vue/composition-api';
import CalendarViewAgendaEntryPresenter from './calendar-view-agenda-entry-presenter.vue';

interface Props {
  events: gapi.client.calendar.Event[]
}

export default createComponent<Props>({
  components: {
    CalendarViewAgendaEntryPresenter,
  },
  props: {
    events: {
      required: true,
    }
  },
  setup(props) {
    const multiplier = ref(1);

    const transformStyle = computed(() => (props.events)
      .map((event) => {
        const start = new Date((event.start && event.start.dateTime) as string);
        const end = new Date((event.end && event.end.dateTime) as string);

        const time = {
          start: start.getHours() * 100 + (start.getMinutes() / 3 * 5),
          end: end.getHours() * 100 + (end.getMinutes() / 3 * 5),
        };
        const duration = time.end - time.start;
        return {
          duration,
          top: time.start,
          minHeight: 90,
          height: duration,
          start: time.start,
          end: time.end,
        };
      })
      .reduce((acc: any[], meta, index) => {
        const top = meta.top * multiplier.value;

        const prevNode = acc[index - 1];
        const prevNodeBottom = (prevNode && (prevNode.top + prevNode.height)) || top;
        // const gapDuration = Math.max(0, meta.start - ((prevNode && prevNode.end) || meta.start));

        const isOverlappingPrevious = top < prevNodeBottom;

        return [...acc, {
          top,
          height: Math.max(meta.minHeight, meta.height),
          end: meta.end,
          overlapCounter: !isOverlappingPrevious ? 0 : ((prevNode && prevNode.overlapCounter) || 0) + 1
        }];
      }, [])
      .map((styleMeta: any) => ({
        height: `${styleMeta.height}px`,
        transform: `translateY(${styleMeta.top}px) translateX(${(styleMeta.overlapCounter) * 10}px)`,
      }))
    );

    return {
      transformStyle,
      multiplier,
    };
  }
});
</script>

<style lang="scss" scoped>
.agenda-entry {
  position: absolute;
  background: #edfbfdd9;
  backdrop-filter: blur(1px);
  transition: box-shadow 0.5s, transform 0.5s;

  &:hover {
    z-index: 1;
    box-shadow: 8px 8px 32px 0 rgba(0,0,0,0.2);
  }
  &:focus {
    z-index: 2;
    box-shadow: 8px 8px 32px 0 rgba(0,0,0,0.2);
  }
}

.calendar-view-agenda {
  position: relative;
  height: 10000px;
}
</style>
