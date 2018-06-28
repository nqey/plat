// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'element-ui/lib/theme-chalk/index.css';
import http from '@/config/https';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import VueAMap from 'vue-amap';


import Vue from 'vue';
import VueQuillEditor from 'vue-quill-editor';
import App from './App';
import router from './router';
import store from './store/store';
import { transfer } from './config/utils';

Vue.config.productionTip = false;
Vue.prototype.$http = http;
Vue.prototype.$transfer = transfer;
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'your amap key',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4',
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  VueQuillEditor,
  template: '<App/>',
  components: { App },
});
