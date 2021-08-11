import Vue from 'vue'
import App from './App.vue'
import { store } from '../store/store'
import router from './router'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueCookies from 'vue-cookies';
import prototype from './helper/prototype.js';

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(VueCookies);


new Vue({
  router,
  store: store,
  render: function (h) { return h(App) }
}).$mount('#app')
