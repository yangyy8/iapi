// 配置API接口地址
//var root="http://192.168.99.247:8080"     //报警

//var root="http://192.168.99.228:8080"     //菜单

// var root="http://192.168.99.248:8181"    //李志鹏的电脑

//var root="http://192.168.99.251:8080"    //时达的电脑

//var root="http://192.168.99.242:8080"    //石飞的电脑

// var root = "http://192.168.99.251:8080"    //性能监控

//var root="http://192.168.99.206:8080"   //服务器电脑
var root=""

// var root = 'http://192.168.99.245:8080'
//var root=""
//var root="http://192.168.99.206:8080"   //服务器电脑
// var root = 'http://192.168.99.206:8080'

// var root = 'http://192.168.99.245:8080'

// var root = 'http://192.168.99.245:8080'


//var root="http://192.168.99.228:8080"    //丁勇的电脑
//var root="http://192.168.99.206:8080"   //服务器电脑

//var root="http://192.168.99.201:8080"    //全国监控


//var root="http://192.168.99.201:8080"    //全国监控
//var root="http://192.168.99.250:8080"    //刘洋的电脑



// 引用axios
var axios = require('axios')
import { Loading } from 'element-ui';
import { Message } from 'element-ui';
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



function apiAxios(method, url, params, success, failure) {
  // console.log(Loading)
  // let loadingInstance1 = Loading.service({ fullscreen: true });
  if (params) {
    // params=addParams(params);
    // params = filterNull(params);
  }
  axios({
      method: method,
      url: url,
      data: method === 'POST' || method === 'PUT' ? params : null,
      params: method === 'GET' || method === 'DELETE' ? params : null,
      baseURL: root,
      withCredentials: false

    })
    .then(function(res) {
      console.log(res)
      if (res.status == 200) {
        if (success) {
          console.log(res.data);
          if(!res.data.success){
            Message.error(res.data.message);
          }
          success(res.data)
          // loadingInstance1.close();
        }
      } else {
        if (failure) {
          failure(res.data)

        } else {
          console.log('error: ' + JSON.stringify(res.data));

        }
        // loadingInstance1.close();
      }
    })
    .catch(function(err) {
      let res = err.response
      if (err) {
        // console.log('api error, HTTP CODE: ' + res.status)
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
  }
}
