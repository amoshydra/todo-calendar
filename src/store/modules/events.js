import gaHelper from '@/libs/gaHelper/index';

export default {
  namespaced: true,
  state: {
    [-1]: [],
    0: [],
    1: [],
  },
  getters: {
    /**
     * Find the first currently occuring event
     * @param {State} state
     * @returns closest past event. null if not available
     */
    getCurrent(state) {
      const now = new Date();
      return state[0].find((event) => {
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
      const justPastedEventIndex = state[0].findIndex((event) => {
        const eventStart = new Date(event.start.dateTime);
        return eventStart > now;
      });

      const closestPastIndex = justPastedEventIndex - 1;
      return state[0][closestPastIndex] || null;
    }
  },
  mutations: {
    update(state, { offset, events }) {
      state[offset] = events;
    },
  },
  actions: {
    retrieve({ commit }, offset = 0) {
      return gaHelper.events.list('primary', offset)
      .then((events) => {
        commit('update', {
          offset,
          events,
        });
      });
    },
  },
};
