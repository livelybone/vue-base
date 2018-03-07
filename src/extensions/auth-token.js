// auth_token
import Vue from 'vue'
import Cookie from 'utils/cookie'

class AuthToken {
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
    return Vue.prototype.$http.get(`/user/myUserInfo`).then(user => {
      Vue.prototype.$store.commit('user', user);
      return user
    }, e => {
      this.setToken('');
      throw e
    })
  }

  getAdminUser() {
    // 获取用户信息
    return Vue.prototype.$http.get(`/user/myUserInfo`).then(user => {
      Vue.prototype.$store.commit('admin', user);
      return user
    }, e => {
      this.setToken('');
      throw e
    })
  }

  signIn({phoneNumber, password}) {
    return Vue.prototype.$http.post(`/login?phoneNumber=${phoneNumber}&password=${password}`).then(res => {
      this.setToken(res);
      return res
    })
  }

  signInAdmin({phoneNumber, password}) {
    return Vue.prototype.$http.post(`/manager/login?phoneNumber=${phoneNumber}&password=${password}`).then(res => {
      this.setToken(res);
      return res
    })
  }

  signOut() {
    return new Promise(resolve => {
      Vue.prototype.$store.state.user = {};
      Vue.prototype.$store.state.admin = {};
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

export default new AuthToken()
