import calendar from '@/libs/calendar';

export const getters = {
  /**
   * Find the first currently occuring event
   * @param {State} state
   * @returns closest past event. null if not available
   */
  getCurrent(state) {
    const now = new Date();
    return state.events.find((event) => {
      const eventStart = new Date(event.start.dateTime);
      const eventEnd = new Date(event.end.dateTime);
      return eventStart < now && now < eventEnd;
    });
  },

  /**
   * Find closest past event
   * @param {State} state
   * @returns closest past event. null if not available
   */
  getClosestPast(state) {
    const now = new Date();
    const justPastedEventIndex = state.events.findIndex((event) => {
      const eventStart = new Date(event.start.dateTime);
      return eventStart > now;
    });

    const closestPastIndex = justPastedEventIndex - 1;
    return state.events[closestPastIndex] || null;
  }
};

export const mutations = {
  list(state, events) {
    state.events = events;
  },
  insert(state, newEvent) {
    state.events.push(newEvent);
  },
  update(state, updatedEvent) {
    state.events = [
      ...state.events.filter(event => event.id !== updatedEvent.id),
      updatedEvent,
    ];
  },
  remove(state, removeEvent) {
    state.events = state.events.filter(event => event.id !== removeEvent.id);
  },
};

export const actions = {
  async list({ states, commit }, options) {
    const events = await calendar.list(options);
    commit('list', events);
    return events;
  },
  async insert({ states, commit }, { calendarId, resource }) {
    const { result } = await calendar.insert(calendarId, resource);
    commit('insert', result);
    return result;
  },
  async update({ states, commit }, { calendarId, eventId, resource }) {
    const { result } = await calendar.update(calendarId, eventId, resource);
    commit('update', result);
    return result;
  },
  async remove({ states, commit }, { calendarId, eventId }) {
    await calendar.remove(calendarId, eventId);
    commit('remove', { id: eventId });
  },
};

export const state = () => ({
  events: [],
});
