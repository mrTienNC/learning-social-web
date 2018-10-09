import Vue from 'vue';
import App from './App';
import router from './router';
import jQuery from 'jquery';
import firebase from './firebase/firebase';
import BootstrapVue from 'bootstrap-vue';
import Vue2Filters from 'vue2-filters';
import FullCalendar from 'vue-full-calendar';
import 'fullcalendar/dist/fullcalendar.css';
import EventBus from './components/EventBus/EventBus';

global.jQuery = jQuery;
global.$ = jQuery;
require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../node_modules/font-awesome/css/font-awesome.min.css');
require('../node_modules/bootstrap/dist/js/bootstrap.min.js');

Vue.config.productionTip = false;
Vue.use(FullCalendar);
Vue.use(BootstrapVue);
Vue.use(Vue2Filters);

let app;

firebase.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: { App },
      router,
      // created(){
      // 	  EventBus.$on('logout' , () => {
      // 		firebase.auth().signOut();
      // 		this.$router.replace('/login');
      // 		EventBus.$emit('logoutSuccsess');
      // 	})
      // },
    });
  }
});
