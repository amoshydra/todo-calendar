import { Ref, onMounted, onUnmounted, ref } from "@vue/composition-api";

interface UseMousePositionOption {
  el: Ref<Element | null>,
  offset?: {
    x?: number,
    y?: number,
  },
}

export const useMousePosition = (useMousePositionOption: UseMousePositionOption) => {
  const option = {
    ...useMousePositionOption,
    offset: {
      x: 0,
      y: 0,
      ...useMousePositionOption.offset || {},
    }
  }

  const x = ref(0);
  const y = ref(0);

  const updateMousePosition = (event: Event) => {
    x.value = (event as MouseEvent).clientX - option.offset.x;
    y.value = (event as MouseEvent).clientY - option.offset.y;
  }

  onMounted(() => {
    const element = option.el.value;
    if (!element) return;
    element.addEventListener('mousemove', updateMousePosition);
  });
  onUnmounted(() => {
    const element = option.el.value;
    if (!element) return;
    element.removeEventListener('mousemove', updateMousePosition);
  });

  return {
    x,
    y,
  }
}
