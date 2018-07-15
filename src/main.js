// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import "babel-polyfill"
import ElementUI from 'element-ui';
import './assets/css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css';

import api from './api/index.js'

// import 'lib-flexible/flexible'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$api = api;
//
// router.beforeEach((to, from, next) => {
//   console.log("to:",to);
//
// })
// router.afterEach((from)=>{
//   // console.log(from)
//   window.scrollTo(0,0);
//
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
