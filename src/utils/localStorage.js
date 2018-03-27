// auth_token
import Cookie from 'utils/cookie'

export default class LocalStorage {
  localStorageSupport = false;
  listener = null;

  constructor(handleStorage) {
    if (typeof window !== 'undefined') {
      this.localStorageSupport = !!window.localStorage;
      if (handleStorage) {
        this.listener = e => handleStorage(e);
        window.addEventListener('storage', this.listener)
      }
    }
  }

  set(key, val) {
    try {
      if (this.localStorageSupport) {
        localStorage.setItem(key, val)
      }
    } catch (e) {
      console.error(e);
      this.localStorageSupport = false;
      Cookie.set(key, val)
    }
  }

  get(key) {
    if (this.localStorageSupport) {
      return localStorage.getItem(key)
    } else {
      return Cookie.get(key)
    }
  }

  removeListener() {
    if (this.listener) window.removeEventListener('storage', this.listener);
  }
}
