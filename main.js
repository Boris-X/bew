import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue';
import './custom.scss';

Vue.use(BootstrapVue);

new Vue({
  el: '#app',
  render: h => h(App)
})
