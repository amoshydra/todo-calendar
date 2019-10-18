import { ref, Ref, onMounted, onUnmounted } from '@vue/composition-api';

const getDistanceBetweenTouches = (touches: Touch[]) => {
  let tMinY = Infinity;
  let tMaxY = -Infinity;
  touches.forEach((touch) => {
    tMinY = Math.min(tMinY, touch.clientY);
    tMaxY = Math.max(tMaxY, touch.clientY);
  });

  const distanceY = tMaxY - tMinY;
  return distanceY;
};

export const getTouchPinchValue = (element: Ref<HTMLElement | null>) => {
  const initialValue = ref(0);
  const pinchValue = ref(0);

  const touchStart = (event: TouchEvent) => {
    if (event.touches.length < 2) { return; }
    initialValue.value = getDistanceBetweenTouches(Array.from(event.touches));
  };
  const touchMove = (event: TouchEvent) => {
    if (event.touches.length < 2) { return; }

    event.preventDefault();

    pinchValue.value = getDistanceBetweenTouches(Array.from(event.touches)) - initialValue.value;
  };
  const touchEnd = (event: TouchEvent) => {
    if (event.touches.length >= 2) { return; }

    pinchValue.value = 0;
  };

  onMounted(() => {
    if (!element.value) { return; }

    element.value.addEventListener('touchstart', touchStart);
    element.value.addEventListener('touchmove', touchMove);
    element.value.addEventListener('touchend', touchEnd);
  });
  onUnmounted(() => {
    if (!element.value) { return; }

    element.value.removeEventListener('touchstart', touchStart);
    element.value.removeEventListener('touchmove', touchMove);
    element.value.removeEventListener('touchend', touchEnd);
  });

  return { pinchValue };
};
