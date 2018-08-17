// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import "babel-polyfill"
import ElementUI from 'element-ui';
import './assets/css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css';
import Print from 'vue-print-nb'
import htmlToPdf from '@/components/other/htmlToPdf'
import api from './api/index.js'
import verify from 'vue-verify-pop'

// import 'lib-flexible/flexible'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Print);
Vue.use(htmlToPdf);
Vue.use(verify);

// verify.errMsg = YourErroMsg
// 增加校验规则
// verify.addRule('myRule', (v) => {return '校验不通过'})

Vue.prototype.$api = api;


router.beforeResolve((to, from, next) => {
  let state=false;
  api.post('/manage-platform/isLanding',{},
   r => {
     state=r.data;
     if(state!=true&&to.matched.some(function (item) {
       return item.meta.logined;
     })){
       next({
         path: '/',
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
