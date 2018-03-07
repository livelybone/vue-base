// 全局状态管理 store
import Vue from 'vue'
import { getUrl } from 'utils/request-deal'

export default function initialCache(http) {
  Vue.prototype.$cache = new Cache(http)
}

class Cache {
  cache = new Map();
  http = null;

  constructor(http) {
    this.http = http
  }

  get(url, params) {
    const key = getUrl(url, params);
    if (this.cache.has(key) && this.getByKey(key)) {
      return new Promise((resolve, reject) => {
        resolve(this.getByKey(key))
      })
    } else {
      this.set(key, 'placeholder'); // 防止多次请求
      return this.http.get(url, params).then(res => {
        this.set(key, res);
        return res
      }, e => {
        this.cache.delete(key);
        throw e;
      })
    }
  }

  getFile(url, params) {
    const key = getUrl(url, params);
    if (this.cache.has(key) && this.getByKey(key)) {
      return new Promise((resolve, reject) => {
        resolve(this.getByKey(key))
      })
    } else {
      this.set(key, 'placeholder'); // 防止多次请求
      return this.http.getFile(key).then(res => {
        this.set(key, res);
        return res
      }, e => {
        this.cache.delete(key);
        throw e;
      })
    }
  }

  getByKey(key) {
    return this.cache.get(key)
  }

  set(key, val) {
    this.cache.set(key, val);
  }
}
