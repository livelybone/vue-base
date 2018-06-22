// 全局状态管理 store
import { http } from 'extensions/http';
import { getUrl } from 'utils/request-deal';

class Cache {
  cache = new Map();

  get(url, params) {
    const key = getUrl(url, params);
    const val = this.getByKey(key);
    if (val) {
      return Promise.resolve(val);
    }
    this.set(key, 'placeholder'); // 防止多次请求
    return http.get(url, params).then((res) => {
      this.set(key, res);
      return res;
    }, (e) => {
      this.cache.delete(key);
      throw e;
    });
  }

  getFile(url, params) {
    const key = getUrl(url, params);
    const val = this.getByKey(key);
    if (val) {
      return Promise.resolve(val);
    }
    this.set(key, 'placeholder'); // 防止多次请求
    return http.getFile(key).then((res) => {
      this.set(key, res);
      return res;
    }, (e) => {
      this.cache.delete(key);
      throw e;
    });
  }

  getByKey(key) {
    return this.cache.get(key);
  }

  set(key, val) {
    this.cache.set(key, val);
  }
}

export const cache = new Cache();

const CachePlugin = {};
CachePlugin.install = (Vue) => {
  Vue.prototype.$cache = cache;
};

export default CachePlugin;
