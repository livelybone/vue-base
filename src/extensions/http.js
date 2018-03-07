// http: axios
import Vue from 'vue'
import axios from 'axios'
import config from 'config/config.js'
import initialCache from 'extensions/cache'
import AuthToken from 'extensions/auth-token'
import { convertToFormData, getUrl } from 'utils/request-deal'

export default function initialHttp() {
  axios.defaults.baseURL = config.backendUrl;
  axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
  axios.defaults.validateStatus = function (status) {
    return (status >= 200 && status < 300) || (status >= 400) // 处理服务器返回的错误信息
  };
  // axios.defaults.timeout = 2500
  const http = new Http();

  Vue.prototype.$http = http;

  initialCache(http)
}

class Http {
  get(url, data) {
    let uri = getUrl(url, data);
    return this.responseDeal(axios.get(setAuth(uri)))
  }

  getFile(url) {
    // 适用于需要登录的情况
    return axios.get(setAuth(url), {responseType: 'blob'}).then(res => {
      return res.data
    })
  }

  post(url, data) {
    // backend 代码统一使用urlParams/FormData对象的处理方式，因此这个API不用，put方法同理
    return this.responseDeal(axios.post(setAuth(url), data))
  }

  postForm(url, data) {
    const formData = convertToFormData(data);
    return this.responseDeal(axios.post(setAuth(url), formData, {headers: {'Content-Type': 'multipart/form-data'}}))
  }

  del(url) {
    return this.responseDeal(axios.delete(setAuth(url)))
  }

  put(url, data) {
    return this.responseDeal(axios.put(setAuth(url), data))
  }

  putForm(url, data) {
    const formData = convertToFormData(data);
    return this.responseDeal(axios.put(setAuth(url), formData, {headers: {'Content-Type': 'multipart/form-data'}}))
  }

  all(callback, ...reqs) {
    const queue = reqs.map(req => {
      if (req.method === 'GET') {
        return this.get(req.url, req.data)
      }
      return axios({
        method: req.method,
        url: setAuth(req.url),
        data: req.data
      })
    });
    return axios.all(queue).then(axios.spread((acct, perms) => {
      callback(acct, perms)
    }))
  }

  responseDeal(promise) {
    return promise.then(res => {
      // 去除config, request, status, statusText...等一些其他字段，关注data
      let data = res.data;
      if (data) {
        if (this.errorValidate(data)) {
          throw new Error(data.msg)
        } else {
          return data.data
        }
      }
      return res
    }, e => {
      // setImmediate(() => Vue.prototype.snackBar.error(e));
      throw e
    })
  }

  errorValidate(data) {
    // 与后台约定的错误验证方式
    // 现约定， 对于返回的数据的字段code，0表示成功，1表示出错
    return data.code !== 0
  }
}

function setAuth(url) {
  axios.defaults.headers['x-auth-token'] = AuthToken.getToken();
  const bdcId = Vue.prototype.$store.state.field.selected.id;
  return !bdcId ? url : getUrl(url, {bdcId})
}
