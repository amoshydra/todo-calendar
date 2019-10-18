import { ref, Ref, onMounted, onUnmounted } from '@vue/composition-api';

const getDistanceBetweenTouches = (touches: Touch[]) => {
  let tMinX = Infinity;
  let tMaxX = -Infinity;
  let tMinY = Infinity;
  let tMaxY = -Infinity;
  touches.forEach((touch) => {
    tMinX = Math.min(tMinX, touch.clientX);
    tMaxX = Math.max(tMaxX, touch.clientX);
    tMinY = Math.min(tMinY, touch.clientY);
    tMaxY = Math.max(tMaxY, touch.clientY);
  });

  const distanceX = tMinX - tMaxX;
  const distanceY = tMinY - tMaxY;

  const distanceX2 = distanceX * distanceX;
  const distanceY2 = distanceY * distanceY;

  return Math.sqrt(distanceX2 + distanceY2);
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
