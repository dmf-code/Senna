import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from './store/store';

Vue.use(ElementUI);
Vue.use(mavonEditor);
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

Vue.prototype.$store = store;

// axios.defaults.baseURL = 'http://127.0.0.1:8081'

new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')