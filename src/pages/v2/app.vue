<template>
  <client-only>
    <CalendarServiceProvider>
      <CalendarViewContainer />
    </CalendarServiceProvider>
  </client-only>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';
import CalendarServiceProvider from '~/components/v2/calendar-service-provider.vue';
import CalendarViewContainer from '~/components/v2/calendar-view-container.vue';

export default createComponent({
  components: {
    CalendarServiceProvider,
    CalendarViewContainer,
  },
});
</script>
