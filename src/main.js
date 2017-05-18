import gaHelper from '@/libs/gaHelper/index';
import Vue from 'vue';
import App from './App';

gaHelper.init((signinStatus) => {
  console.log(signinStatus);
});

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
});
