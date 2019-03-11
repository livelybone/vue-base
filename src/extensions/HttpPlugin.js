import { Storage } from '@livelybone/storage'
import axios from 'axios'
import config from 'config/config'
import { convertToFormData, getUrl } from 'utils/RequestInterceptor'

/**
 * http: axios
 */
function setAuth(url) {
  axios.defaults.headers['x-auth-token'] = new Storage().get('AUTH_TOKEN')
  return url
}

function initialAxios() {
  axios.defaults.baseURL = config.backendUrl
  axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
  axios.defaults.withCredentials = true // 允许 AJAX 跨域请求带 Cookie 设置
  // 如果你想在客户端app中获取自定义的 header 信息，需要在服务器端 header 中添加 Access-Control-Expose-Headers：
  // header('Access-Control-Expose-Headers:token,uid');
  // 处理服务器返回的错误信息
  axios.defaults.validateStatus = status => (status >= 200 && status < 300) || status >= 400
}

initialAxios()

export class Http {
  static getFile(url) {
    // 适用于需要登录的情况
    return axios.get(setAuth(url), { responseType: 'blob' }).then(res => res.data)
  }

  static errorValidate(data) {
    // 与后台约定的错误验证方式
    // 现假设约定， 对于返回的数据的字段code，0表示成功，1表示出错
    return data.code !== 0
  }

  static get(url, data) {
    const uri = getUrl(url, data)
    return this.responseDeal(axios.get(setAuth(uri)))
  }

  static post(url, data) {
    return this.responseDeal(axios.post(setAuth(url), data))
  }

  static postForm(url, data) {
    const formData = convertToFormData(data)
    return this.responseDeal(
      axios.post(setAuth(url), formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
    )
  }

  static del(url) {
    return this.responseDeal(axios.delete(setAuth(url)))
  }

  static put(url, data) {
    return this.responseDeal(axios.put(setAuth(url), data))
  }

  static putForm(url, data) {
    const formData = convertToFormData(data)
    return this.responseDeal(
      axios.put(setAuth(url), formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
    )
  }

  static all(callback, ...reqs) {
    const queue = reqs.map(req => {
      if (req.method === 'GET') {
        return this.get(req.url, req.data)
      }
      return axios({
        method: req.method,
        url: setAuth(req.url),
        data: req.data,
      })
    })
    return axios.all(queue).then(
      axios.spread((acct, perms) => {
        callback(acct, perms)
      }),
    )
  }

  static responseDeal(promise) {
    return promise.then(
      res => {
        // 去除config, request, status, statusText...等一些其他字段，关注data
        const { data, status } = res
        const { message, msg, code, result } = data || {}
        if (data) {
          if (Http.errorValidate(data)) {
            const error = new Error(message || msg)
            error.statusCode = status
            error.resCode = code
            throw error
          } else {
            return result
          }
        }
        return res
      },
      e => {
        // setImmediate(() => Vue.prototype.snackBar.error(e));
        throw e
      },
    )
  }
}

const HttpPlugin = {}

HttpPlugin.install = Vue => {
  Vue.prototype.$http = Http
}

export default HttpPlugin
