// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'element-ui/lib/theme-chalk/index.css';
import http from '@/config/https';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';


import Vue from 'vue';
import VueQuillEditor from 'vue-quill-editor';
import App from './App';
import router from './router';
import store from './store/store';

Vue.config.productionTip = false;
Vue.prototype.$xhr = http.xhr;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  VueQuillEditor,
  template: '<App/>',
  components: { App },
});
