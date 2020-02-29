<template>
  <div>
    <div>
      <button @click="move(-1)">
        ◀
      </button>
      <button @click="move(1)">
        ▶
      </button>
      {{ friendlyDate }}
    </div>
  </div>
</template>

<script lang="ts">
import { ref, createComponent, watch, computed } from '@vue/composition-api';
import T from 'time-chainer';
import { parse } from '~/utilities/url-queries';
import { toLocalIsoDateString, parseIsoDateString } from '~/utilities/date';

const getDates = (search: string, target: string) => {
  const dateQuery = parse(search)[target] || '';
  const today = new Date();
  const selectedDate = parseIsoDateString(dateQuery) || new Date(toLocalIsoDateString(today));
  const selectedNextDate = new Date(selectedDate.valueOf() + T.days(1));

  return ref<{ start: Date, end: Date }>({
    start: selectedDate,
    end: selectedNextDate,
  });
};

const DATE_QUERY_NAME = 's';

export default createComponent({
  setup(_props, context) {
    const dates = getDates(location.search, DATE_QUERY_NAME);

    watch(() => dates.value.start && dates.value.end, () => {
      const localDateString = toLocalIsoDateString(dates.value.start);

      const url = new URL(location.href);
      url.searchParams.set(DATE_QUERY_NAME, localDateString);
      history.replaceState({}, document.title, url.href);

      context.emit('input', dates);
    });

    const friendlyDate = computed(() => {
      const startDate = dates.value.start;
      const day = startDate.toLocaleString(navigator.language, { weekday: 'long' });
      const date = startDate.toLocaleString(navigator.language, { dateStyle: 'long' });

      return `${date} (${day})`;
    });

    return {
      friendlyDate,
      move(distance: number) {
        const diff = (distance * T.days(1));
        dates.value.start = new Date(dates.value.start.valueOf() + diff);
        dates.value.end = new Date(dates.value.end.valueOf() + diff);
      }
    };
  }
});
</script>
