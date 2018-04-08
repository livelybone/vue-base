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
      } else {
        Cookie.set(key, val)
      }
    } catch (e) {
      console.error(e);
      this.localStorageSupport = false;
      if (val) Cookie.set(key, val);
      else Cookie.del(key);
    }
  }

  get(key) {
    try {
      if (this.localStorageSupport) {
        return localStorage.getItem(key)
      } else {
        return Cookie.get(key)
      }
    } catch (e) {
      console.error(e);
      this.localStorageSupport = false;
      Cookie.get(key)
    }
  }

  del(key) {
    try {
      if (this.localStorageSupport) {
        localStorage.removeItem(key)
      } else {
        Cookie.del(key)
      }
    } catch (e) {
      console.error(e);
      this.localStorageSupport = false;
      Cookie.del(key);
    }
  }

  removeListener() {
    if (this.listener) window.removeEventListener('storage', this.listener);
  }
}
