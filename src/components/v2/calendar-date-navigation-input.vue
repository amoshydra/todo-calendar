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

const getDates = (search: string, target: string) => {
  const dateQuery = parse(search)[target] || '';
  const splitant = dateQuery.split('-');
  const today = new Date();
  const [month, thisDay, nextDay] = [
    splitant[0] || today.getMonth() + 1,
    splitant[1] || today.getDate(),
    splitant[2] || today.getDate() + 1,
  ]
    .map(x => `${x}`.padStart(2, '0'))
  ;

  return ref<{ start: Date, end: Date }>({
    start: new Date(`2019-${month}-${thisDay}T00:00:00.000+0800`),
    end: new Date(`2019-${month}-${nextDay}T00:00:00.000+0800`),
  });
};

export default createComponent({

  setup(_props, context) {
    const dates = getDates(location.search, 's');

    watch(() => dates.value.start && dates.value.end, () => {
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
