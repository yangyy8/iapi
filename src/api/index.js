// 配置API接口地址

// var root="http://192.168.99.206:8080"

// var root=""
//var root="http://192.168.99.242:8081"
// var root = 'http://192.168.99.248:8081'
var root = 'http://192.168.99.248:8080'
// var root="http://192.168.99.247:8080"
//var root = 'http://192.168.99.244:8080'
// var root="http://192.168.99.213:8080"   //服务器电脑
// var root="http://192.168.99.228:8080"
// var root = 'http://192.168.99.234:8080'
// var root="http://10.6.126.138:8088" //正式环境
// var root="http://192.168.99.234:8080" //正式环境
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
function apiAxios(method, url, params, success, failure,header) {
  // console.log("url",url)
  let loadingInstance1=null;
  if(!(url=='/manage-platform/nationwide/getPortDetail'||url=='/manage-platform/nationwide/getFlightDetail'||url=='/manage-platform/nameList/getNameListDataAnalysis'||url=='/manage-platform/riskRecordExtInterfaceController/getRecordOtherInfo'||url=='/manage-platform/iapiHead/queryListPageCount')){
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
      withCredentials: true,
      headers: header||{'X-Requested-With': 'XMLHttpRequest'},
      // headers: {'X-Requested-With': 'XMLHttpRequest'},
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
                     // console.log("ffffff")
                window.location.href ="#/";
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
function apiAxios2(method, url, params, success, failure,header) {
  // console.log("url",url)
  let loadingInstance1=null;
  loadingInstance1 = Loading.service({
    fullscreen: false,
    spinner: 'el-icon-loading',
    background:'rgba(0,0,0,0)',
    customClass:'local',
    target:document.querySelector('.loadingtext')
  });
  if (params) {
    // params = filterNull(params);
  }
  axios({
      method: method,
      url: url,
      data: method === 'POST' || method === 'PUT' ? params : null,
      params: method === 'GET' || method === 'DELETE' ? params : null,
      baseURL: root,
      withCredentials: true,
      headers: header||{'X-Requested-With': 'XMLHttpRequest'},
      // headers: {'X-Requested-With': 'XMLHttpRequest'},
    })
    .then(function(res) {
      console.log(res)
      if (res.status == 200) {
        if (success) {
          // console.log(res.data);
          // setTimeout(function(){
            if(loadingInstance1){
              console.log(1);
              loadingInstance1.close();
              console.log(2);
            }
            success(res.data)
          // },1000)
        }
      } else if(res.status == 504){
        Message.error('请求超时！');
        if(loadingInstance1){
          loadingInstance1.close();
        }
      }
      else {
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
  post: function(url, params, success, failure,header) {
    return apiAxios('POST', url, params, success, failure,header)
  },
  put: function(url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function(url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  },
  post2: function(url, params, success, failure,header) {
    return apiAxios2('POST', url, params, success, failure,header)
  },
  rootUrl:"http://"+window.location.host
}
