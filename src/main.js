// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import "babel-polyfill"
import '../theme/index.css'
import ElementUI from 'element-ui';
import './assets/css/normalize.css'
// import 'element-ui/lib/theme-chalk/index.css';
import Print from 'vue-print-nb'
import htmlToPdf from '@/components/other/htmlToPdf'
import vverify from 'v-verify'
// import vva from './assets/js/va.js'

import api from './api/index.js';
// import VueValidator from 'vue-validator'
// var VueValidator = require('vue-validator')
// import 'lib-flexible/flexible'
import App from './App'
import router from './router'
import multiCascader from "multi-cascader";
import cascaderMulti from "cascader-multi";

Vue.config.productionTip = false
Vue.use(multiCascader);
Vue.use(cascaderMulti);
Vue.use(ElementUI);
Vue.use(Print);
Vue.use(htmlToPdf);
// Vue.use(VueValidator)
Vue.use(vverify, {
  lang: 'zh_cn', // 提示语言 默认 中文
  mode: 'tip', // v-verify 提供了 tip 和 insert 两种错误展示方式
  errorClass: 'example-error', // 错误消息样式
  errorIcon: 'el-icon-warning', // String 错误提示 icon 样式
  errorForm: '', // 错误消息样式
  validators: { // 自定义验证器
    zing: (value) => {
     return /^[a-zA-Z0-9_-]+@zing\\.com$/.test(value)
   },
   noCinese:(value)=>{
     return !(/[\u4E00-\u9FA5]/g.test(value))
   }
  },
  messages: { // 验证器消息提示
     zing: (filed) => `${filed}必须以@zing.com结尾`,
     noCinese:(filed) => `${filed}不可以輸入中文`
   }
 })
// Vue.use(vva)
Vue.prototype.$api = api;


router.beforeResolve((to, from, next) => {

  let state=false;
  api.post('/manage-platform/isLanding',{},
   r => {
     state=r.data;
     if(state!=true&&to.matched.some(function (item) {
       return item.meta.logined;
     })){
       console.log(1)
       next({
         path: '/',
         query:{isLogin:false}
       })
     }else{
       next();
     }
  })

})

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
