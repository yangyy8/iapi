// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import "babel-polyfill"
import '../theme/index.css'
import ElementUI from 'element-ui';
import './assets/css/normalize.css'
// import 'element-ui/lib/theme-chalk/index.css';
import Print from 'vue-print-nb'
import Prints from '@/components/other/print'
import htmlToPdf from '@/components/other/htmlToPdf'
import vverify from 'v-verify'
import './directives.js'

// import Validator from './assets/js/va.js'
// Vue.use(Validator)
import vueValidateEasy from './assets/js/vue-validate-easy'
var validators ={
   cname(val){
     var len = 0;
      for (var i=0; i<val.length; i++) {
          if (val.charCodeAt(i)>127 || val.charCodeAt(i)==94) {
               len += 3;
           } else {
               len ++;
           }
       }
     // var p = /^[a-zA-Z0-9]{0,35}$|^[\u4e00-\u9fa5]{0,11}$/.test(val)
     if(len>35) return '字符不能超过35位'
   },
   noCinese(val){
     var p = /[\u4E00-\u9FA5]/g.test(val)
     if(p) return '不可以输入中文'
   },
   number(val){
     var p = !(/^-?\d+(\.\d{1,5})?$/.test(val))
     if(p) return '请输入数字aaa'
   }
}
Vue.use(vueValidateEasy,{validators})
import api from './api/index.js';

// import 'lib-flexible/flexible'
import App from './App'
import router from './router'
// import multiCascader from "multi-cascader";
// import cascaderMulti from "cascader-multi";

Vue.config.productionTip = false
// Vue.use(multiCascader);
// Vue.use(cascaderMulti);
Vue.use(ElementUI);
Vue.use(Print);
Vue.use(htmlToPdf);
Vue.use(Prints);
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
   },
   number:(value)=>{
     return /^-?\d+(\.\d{1,5})?$/.test(value)
   },
   phone:(value)=>{
     return /^[1][3,4,5,7,8][0-9]{9}$/.test(value)
   },
   fix:(value)=>{
     return  /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/.test(value)
   },
   fixPhone:(value)=>{
     return /(^(\d{3,4}-)?\d{7,8})$|^((1[0-9][0-9]\d{8}$))/.test(value)
   },
   cname:(value)=>{
     return /^[a-zA-Z0-9]{0,35}$|^[\u4e00-\u9fa5]{0,11}$/.test(value)
   }
  },
  messages: { // 验证器消息提示
     zing: (filed) => `${filed}必须以@zing.com结尾`,
     noCinese:(filed) => `${filed}不可以輸入中文`,
     number:(filed) => `${filed}请输入数字`,
     phone:(filed) => `${filed}移动电话格式不正确`,
     fix:(filed) => `${filed}传真格式不正确`,
     fixPhone:(filed) =>`${filed}固定电话格式不正确`,
     cname:(filed) =>`${filed}姓名不能超过11个汉字，35个字母或数字`,
   }
 })
// Vue.use(vva)
Vue.prototype.$api = api;
Vue.prototype.mouseHeader=function(event){
  if(event.target.parentNode.nodeName=="TH"){
    let div=event.target
    event.target.title=div.innerText
  }
};



Vue.prototype.btnctlFn=function(val){
  console.log("val",val,val.menuList)
  if(!val.menuList){
    let sessionItem=sessionStorage.sessionItem
    val=JSON.parse(sessionItem);
    console.log('valSess',val);
  }
  if(val.menuList){
    let list4=val.menuList;
    for(var x=0;x<list4.length;x++){
      let arr=document.getElementsByName(list4[x].url);
      for(var i=0;i<arr.length;i++){
        if(list4[x].choose){
          arr[i].style.display='inline-block'
          // console.log('arr['+i+'].style.display '+arr[i].innerText,arr[i].style.display)
        }else{
          arr[i].style.display='none'
          // console.log('arr['+i+'].style.display'+arr[i].innerText,arr[i].style.display)
        }

      }
    }
  }
};

console.log(vueValidateEasy)
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
  data() {
     return {
       checkItem:{},
       tabList:null,
     }
   },
  components: { App },
  template: '<App/>'
})
