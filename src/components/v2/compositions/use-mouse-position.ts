import { Ref, onMounted, onUnmounted, ref, computed } from '@vue/composition-api';

interface UseMousePositionOption {
  el: Ref<HTMLElement | null>,
  offset?: {
    x?: number,
    y?: number,
  },
}

const accumulateParentOffset = (element: HTMLElement) => {
  let x = 0;
  let y = 0;
  let elCursor: HTMLElement | null = element;

  while (elCursor != null) {
    x += elCursor.offsetLeft;
    y += elCursor.offsetTop;
    elCursor = <HTMLElement>elCursor.offsetParent;
  }
  return { x, y };
};

export const useMousePosition = (useMousePositionOption: UseMousePositionOption) => {
  const option = {
    ...useMousePositionOption,
    offset: {
      x: 0,
      y: 0,
      ...useMousePositionOption.offset || {},
    }
  };
  const clientX = ref(0);
  const clientY = ref(0);
  const scrollX = ref(0);
  const scrollY = ref(0);
  const offsetX = ref(0);
  const offsetY = ref(0);

  const isTouching = ref(false);
  const updateIsTouchingStatus = (event: TouchEvent) => {
    isTouching.value = event.touches.length > 0;
  };
  const updateMousePosition = (event: MouseEvent) => {
    if (isTouching.value) { return; }
    clientX.value = event.clientX;
    clientY.value = event.clientY;
  };
  const updateTouchPosition = (event: TouchEvent) => {
    const cum = Array.from(event.touches).reduce((acc, touch) => {
      acc.x += touch.clientX;
      acc.y += touch.clientY;
      return acc;
    }, {
      x: 0,
      y: 0,
    });

    clientX.value = (cum.x / event.touches.length);
    clientY.value = (cum.y / event.touches.length);
  };
  const handleScroll = (event: Event) => {
    const el = (event.target as HTMLElement);
    scrollX.value = el.scrollLeft;
    scrollY.value = el.scrollTop;
  };

  onMounted(() => {
    const element = option.el.value;
    if (!element) { return; }

    const { x, y } = accumulateParentOffset(element);
    offsetX.value = x + option.offset.x;
    offsetY.value = y + option.offset.y;

    element.addEventListener('mousemove', updateMousePosition);
    element.addEventListener('touchstart', updateIsTouchingStatus);
    element.addEventListener('touchend', updateIsTouchingStatus);
    element.addEventListener('touchmove', updateTouchPosition);
    element.addEventListener('scroll', handleScroll);
  });
  onUnmounted(() => {
    const element = option.el.value;
    if (!element) { return; }
    element.removeEventListener('mousemove', updateMousePosition);
    element.removeEventListener('touchstart', updateIsTouchingStatus);
    element.removeEventListener('touchend', updateIsTouchingStatus);
    element.removeEventListener('touchmove', updateTouchPosition);
    element.removeEventListener('scroll', handleScroll);
  });

  return {
    x: computed(() => clientX.value + scrollX.value - offsetX.value),
    y: computed(() => clientY.value + scrollY.value - offsetY.value),
    offsetX,
    offsetY,
    clientX,
    clientY,
    scrollX,
    scrollY,
  };
};
