import { Ref, watch, onMounted, onUnmounted, ref, computed } from '@vue/composition-api';
import { useMousePosition } from './use-mouse-position';

export const maintainScrollPosition = ({ scale, el }: {
  scale: Ref<number>,
  el: Ref<HTMLElement | null>,
}) => {
  const mousemove = useMousePosition({ el });

  const scrollTop = ref(0);
  const scrollHeight = ref(0);
  const scrollRatio = computed(() => mousemove.y.value / scrollHeight.value);

  watch(() => scale.value, () => {
    const target = el.value;
    if (!target) { return; }

    const desiredScrollTop = (scrollRatio.value * target.scrollHeight) - (mousemove.y.value - mousemove.scrollY.value);
    target.scrollTo({
      left: 0,
      top: desiredScrollTop,
      behavior: 'auto',
    });
  });

  const update = (event: Event) => {
    const target = event.target as HTMLElement;
    scrollTop.value = target.scrollTop;
    scrollHeight.value = target.scrollHeight;
  };

  onMounted(() => {
    const element = el.value;
    if (!element) { return; }

    scrollTop.value = element.scrollTop;
    scrollHeight.value = element.scrollHeight;

    element.addEventListener('scroll', update);
  });
  onUnmounted(() => {
    const element = el.value;
    if (!element) { return; }
    element.removeEventListener('scroll', update);
  });

  return {
    scrollTop,
    scrollHeight,
    scrollRatio,
  };
};
