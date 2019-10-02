import Time from 'time-chainer';
import { ref, onUnmounted } from '@vue/composition-api';

interface UseCurrentTimeOption {
  interval?: number
}

export function useCurrentTime(useCurrentTimeOption?: UseCurrentTimeOption) {
  const option = {
    interval: Time.seconds(1),
    ...(useCurrentTimeOption || {}),
  };

  const time = ref(Date.now());

  const intervalId = setInterval(() => {
    time.value = (Date.now());
  }, option.interval);

  onUnmounted(() => {
    clearInterval(intervalId);
  });

  return { time, intervalId };
}
