import Vue from 'vue';
import Vuex from 'vuex';
// Vuex modules
import events from './modules/events';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: {
    events,
  },
  strict: process.env.NODE_ENV !== 'production',
});
