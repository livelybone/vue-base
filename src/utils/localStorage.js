// auth_token
import Cookie from 'utils/cookie'

export default class LocalStorage {
  localStorageSupport = false;

  constructor(handleStorage) {
    if (typeof window !== 'undefined') {
      this.localStorageSupport = !!window.localStorage;
      if (handleStorage)
        window.addEventListener('storage', handleStorage)
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

  removeListenner() {
    window.removeEventListener('storage', handleStorage);
  }
}
