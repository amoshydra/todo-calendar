import { Ref, onMounted, onUnmounted, ref } from '@vue/composition-api';

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

  const x = ref(0);
  const y = ref(0);
  const offset = ref({
    x: 0,
    y: 0,
  });

  const isTouching = ref(false);
  const updateIsTouchingStatus = (event: TouchEvent) => {
    isTouching.value = event.touches.length > 0;
  };
  const updateMousePosition = (event: Event) => {
    if (isTouching.value) { return; }
    x.value = (event as MouseEvent).clientX - offset.value.x;
    y.value = (event as MouseEvent).clientY - offset.value.y;
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

    x.value = (cum.x / event.touches.length) - offset.value.x;
    y.value = (cum.y / event.touches.length) - offset.value.y;
  };

  onMounted(() => {
    const element = option.el.value;
    if (!element) { return; }

    const { x, y } = accumulateParentOffset(element);
    offset.value.x = x + option.offset.x;
    offset.value.y = y + option.offset.y;

    element.addEventListener('mousemove', updateMousePosition);
    element.addEventListener('touchstart', updateIsTouchingStatus);
    element.addEventListener('touchend', updateIsTouchingStatus);
    element.addEventListener('touchmove', updateTouchPosition);
  });
  onUnmounted(() => {
    const element = option.el.value;
    if (!element) { return; }
    element.removeEventListener('mousemove', updateMousePosition);
    element.removeEventListener('touchstart', updateIsTouchingStatus);
    element.removeEventListener('touchend', updateIsTouchingStatus);
    element.removeEventListener('touchmove', updateTouchPosition);
  });

  return {
    x,
    y,
  };
};
