// 全局状态管理 store
import { Http } from '@/extensions/HttpPlugin'
import { getUrl } from '@/utils/RequestInterceptor'
import Singleton from '@/utils/Singleton'

export class Cache {
  static get(url, params) {
    const key = getUrl(url, params)
    return Singleton.promiseForever(() => Http.get(url, params), key)
  }

  static getFile(url, params) {
    const key = getUrl(url, params)
    return Singleton.promiseForever(() => Http.getFile(key), key)
  }
}

const CachePlugin = {}
CachePlugin.install = Vue => {
  Vue.prototype.$cache = Cache
}

export default CachePlugin
