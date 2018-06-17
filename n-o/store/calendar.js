import calendar from '@/libs/calendar';

export const state = () => ({
  events: [],
});

export const mutations = {
  list(state, events) {
    state.events = events;
  },
};

export const actions = {
  async list ({ states, commit }, options) {
    const events = await calendar.list(options);
    commit('list', events);
    return events;
  },
}