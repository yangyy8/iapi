// 配置API接口地址
//var root="http://192.168.99.242:8080"    //石飞的电脑
//var root = "http://192.168.99.248:8181"    //性能监控

// var root = "http://192.168.99.248:8181"    //性能监控
//var root="http://192.168.99.228:8080"    //丁勇的电
// var root="http://192.168.99.247:8080"    //任志强的电脑
// var root = 'http://192.168.99.245:8080'
//var root="http://192.168.99.228:8080"    //丁勇的电
<<<<<<< HEAD
//var root="http://192.168.99.228:8080"    //丁勇的电脑
//var root = 'http://192.168.99.245:8080'
 var root="http://192.168.99.206:8080"   //服务器电脑
=======
//var root="http://192.168.99.228:8080
//var root = 'http://192.168.99.245:8080'
 var root="http://192.168.99.206:8080"   //
// var root = 'http://192.168.99.245:8080'
// var root="http://192.168.99.206:8080"   //服务器电脑
>>>>>>> 4bfb6c702cf3adb58ed66fab3cf089a402da0ee0
//var root='';
//var root="http://192.168.99.201:8080"    //全国监控
// var root="http://192.168.99.251:8080"    //刘洋的电脑
//var root="http://192.168.99.250:8080"    //刘洋的电脑

// 引用axios
var axios = require('axios')
import { Loading } from 'element-ui';
import { Message } from 'element-ui';
import { MessageBox } from 'element-ui';
// 自定义判断元素类型JS
function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull(o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}
// 添加默认参数
function apiAxios(method, url, params, success, failure,isLoad) {
  console.log("url",url)
  let loadingInstance1=null;
  if(!(url=='/manage-platform/nationwide/getPortDetail'||url=='/manage-platform/nationwide/getFlightDetail')){
    loadingInstance1 = Loading.service({ fullscreen: true, spinner: 'el-icon-loading',text:'拼命加载中',background:'rgba(0,0,0,0.6)',customClass:'loadingClass'});
  }
  if (params) {
    // params = filterNull(params);
  }

  axios({
      method: method,
      url: url,
      data: method === 'POST' || method === 'PUT' ? params : null,
      params: method === 'GET' || method === 'DELETE' ? params : null,
      baseURL: root,
      withCredentials: true
    })
    .then(function(res) {
      // console.log(res)
      if (res.status == 200) {
        if (success) {
          // console.log(res.data);
          // setTimeout(function(){
            if(loadingInstance1){
              loadingInstance1.close();
            }
            if(!res.data.success){
              if(res.data.message=="获取登录信息失败！"){
                  MessageBox.alert('登录已失效，请重新登录?', '提示', {
                     confirmButtonText: '确定',
                     type: 'warning'
                   }).then(() => {
                     // console.log("ffffff")
                     window.location.href ="#/";
                   })
              }else{
                Message.error(res.data.message);
              }
            }
            success(res.data)
          // },1000)
        }
      } else {
        if (failure) {
          failure(res.data)
        } else {
          console.log('error: ' + JSON.stringify(res.data));
        }
        if(loadingInstance1){
          loadingInstance1.close();
        }
      }
    })
    .catch(function(err) {
      let res = err.response
      if (err) {
        // console.log('api error, HTTP CODE: ' + res.status)
      }
      if(loadingInstance1){
        loadingInstance1.close();
      }
    })
}
// 返回在vue模板中的调用接口
export default {
  get: function(url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function(url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function(url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function(url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  },
  rootUrl:"http://"+window.location.host
}
