// auth_token
import { http } from 'extensions/http'
import Cookie from 'utils/cookie'

class AuthTokenClass {
  key = 'AUTH_TOKEN';
  localStorageSupport = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.localStorageSupport = !!window.localStorage;
      window.addEventListener('storage', e => {
        console.log(e)
      })
    }
  }

  getUser() {
    // 获取用户信息
    return http.get(`/user/myUserInfo`).then(user => {
      return user
    }, e => {
      this.setToken('');
      throw e
    })
  }

  getAdminUser() {
    // 获取用户信息
    return http.get(`/user/myUserInfo`).then(user => {
      return user
    }, e => {
      this.setToken('');
      throw e
    })
  }

  signIn({phoneNumber, password}) {
    return http.post(`/login?phoneNumber=${phoneNumber}&password=${password}`).then(res => {
      this.setToken(res);
      return res
    })
  }

  signInAdmin({phoneNumber, password}) {
    return http.post(`/manager/login?phoneNumber=${phoneNumber}&password=${password}`).then(res => {
      this.setToken(res);
      return res
    })
  }

  signOut() {
    return new Promise(resolve => {
      this.setToken('');
      resolve()
    })
  }

  setToken(val) {
    try {
      if (this.localStorageSupport) {
        localStorage.setItem(this.key, val)
      }
    } catch (e) {
      console.error(e);
      this.localStorageSupport = false;
      Cookie.set(this.key, val)
    }
  }

  getToken() {
    if (this.localStorageSupport) {
      return localStorage.getItem(this.key)
    } else {
      return Cookie.get(this.key)
    }
  }
}

export const AuthToken = new AuthTokenClass();
