// 全局状态管理 store
import { Http } from 'extensions/HttpPlugin'
import { getUrl } from 'utils/RequestInterceptor'

export class Cache {
  static get(url, params) {
    const key = getUrl(url, params)
    const val = this.getByKey(key)
    if (val) {
      return Promise.resolve(val)
    }
    this.set(key, 'placeholder') // 防止多次请求
    return Http.get(url, params).then((res) => {
      this.set(key, res)
      return res
    }, (e) => {
      this.cache.delete(key)
      throw e
    })
  }

  static getFile(url, params) {
    const key = getUrl(url, params)
    const val = this.getByKey(key)
    if (val) {
      return Promise.resolve(val)
    }
    this.set(key, 'placeholder') // 防止多次请求
    return Http.getFile(key).then((res) => {
      this.set(key, res)
      return res
    }, (e) => {
      this.cache.delete(key)
      throw e
    })
  }

  static getByKey(key) {
    return this.cache.get(key)
  }

  static set(key, val) {
    this.cache.set(key, val)
  }
}

Cache.cache = new Map()

const CachePlugin = {}
CachePlugin.install = (Vue) => {
  Vue.prototype.$cache = Cache
}

export default CachePlugin
