import { computed, Ref } from '@vue/composition-api';

interface EventsTransformationOption {
  minHeight: number,
  overlapOffset?: number,
}
interface EventsTransformationEventSource {
  events: Ref<gapi.client.calendar.Event[]>,
}
interface EventsTransformationScaleSource {
  scale: Ref<number>,
}

interface EventDimension {
  height: number,
  start: number,
  end: number
}

const convertGapiEventToDate = (event: gapi.client.calendar.Event) => ({
  start: new Date((event.start && event.start.dateTime) as string),
  end: new Date((event.end && event.end.dateTime) as string),
});
const convertDateToInt = (date: Date) => date.getHours() * 100 + (date.getMinutes() / 3 * 5);
const computeEventDimension = (event: gapi.client.calendar.Event): EventDimension => {
  const { start, end } = convertGapiEventToDate(event);
  const time = {
    start: convertDateToInt(start),
    end: convertDateToInt(end),
  };
  return {
    height: time.end - time.start,
    start: time.start,
    end: time.end,
  };
};
const computeTransformationStyle = (option: EventsTransformationOption) => (styleMeta: any) => {
  const styleOption = {
    overlapOffset: option.overlapOffset || 10,
    ...option,
  };

  const offsetX = ((styleMeta.overlapCounter | 0) * styleOption.overlapOffset);

  return ({
    minHeight: option.minHeight,
    height: styleMeta.height,
    y: styleMeta.top | 0,
    x: offsetX,
  });
};

export const computeEventsTransformation = (
  eventsSource: EventsTransformationEventSource,
  scaleSource: EventsTransformationScaleSource,
  option: EventsTransformationOption,
) => {
  const transformationStyles = computed(() => {
    const scale = scaleSource.scale.value;
    return (eventsSource.events.value)
      .map(computeEventDimension)
      .reduce((acc: any[], meta, index) => {
        const top = meta.start * scale;
        const height = meta.height * scale;

        const prevNode = acc[index - 1];
        const prevNodeBottom = (prevNode && (prevNode.top + prevNode.height)) || top;

        const isOverlappingPrevious = top < prevNodeBottom;

        return [...acc, {
          top,
          height,
          overlapCounter: !isOverlappingPrevious ? 0 : ((prevNode && prevNode.overlapCounter) || 0) + 1
        }];
      }, [])
      .map(computeTransformationStyle(option));
  });

  return {
    transformationStyles
  };
};
