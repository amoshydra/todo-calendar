// Global Import
import fullCalendar from 'fullcalendar';
import 'fullcalendar/dist/fullcalendar.css';
import Vue from 'vue';
import App from './App';


Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
});
