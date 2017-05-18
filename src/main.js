import gaHelper from '@/libs/gaHelper';
import Vue from 'vue';
import App from './App';

gaHelper.init();

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
});
