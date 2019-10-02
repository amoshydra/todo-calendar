import { ref, onMounted, onUnmounted, Ref } from '@vue/composition-api';

interface MouseWheelOption {
  initial?: number
  min?: number
  max?: number
  invert?: boolean
  scale?: number
  el?: Ref<Element | null>
}

export function useScaleWithMouseWheel(mouseWheelOption: MouseWheelOption) {
  const option = {
    initial: 1,
    min: 0,
    max: Infinity,
    invert: false,
    scale: 1,
    el: { value: window },
    ...mouseWheelOption,
  };

  const scaleFactor = option.scale * (option.invert ? -1 : 1);
  const clamp = (value: number) => Math.min(option.max, Math.max(option.min, value));

  const scale = ref(option.initial);
  function update(event: Event) {
    if ((event as WheelEvent).ctrlKey) {
      const newValue = scale.value + ((event as WheelEvent).deltaY * scaleFactor);
      scale.value = clamp(newValue);

      event.preventDefault();
    }
  }
  onMounted(() => {
    const target = option.el.value;
    if (!target) { return; }
    target.addEventListener('wheel', update);
  });
  onUnmounted(() => {
    const target = option.el.value;
    if (!target) { return; }
    target.removeEventListener('wheel', update);
  });

  return { scale };
}
