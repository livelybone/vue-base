import { Http } from '@/common/extensions/HttpPlugin'
import { getUrl } from '@/common/utils/RequestInterceptor'
import Singleton from '@/common/utils/Singleton'

export class CacheClass {
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
  Vue.prototype.$cache = CacheClass
}

export default CachePlugin
