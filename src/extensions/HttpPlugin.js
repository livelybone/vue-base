import AuthToken from '@/data/api/AuthToken'
import { convertToFormData, getUrl } from '@/utils/RequestInterceptor'
import axios from 'axios'
import config from 'config/config'

/**
 * http: axios
 */
function setAuth(url) {
  axios.defaults.headers['x-auth-token'] = AuthToken.getToken()
  return url
}

function initialAxios() {
  axios.defaults.baseURL = config.backendUrl
  axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
  // Custom headers
  // axios.defaults.header['Access-Control-Expose-Headers'] = 'token, uid';
  // Enable operate cookie
  // axios.defaults.withCredentials = true
  axios.defaults.validateStatus = status =>
    (status >= 200 && status < 300) || status >= 400
}

initialAxios()

export class Http {
  static getFile(url) {
    // Get file by XHR when the file need authorization
    return axios
      .get(setAuth(url), { responseType: 'blob' })
      .then(res => res.data)
  }

  static errorValidate(data) {
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
      axios.post(setAuth(url), formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
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
      axios.put(setAuth(url), formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
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
