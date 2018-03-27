// auth_token
import { http } from 'extensions/http'
import LocalStorage from "utils/localStorage";

class AuthTokenClass {
  token = new Map();
  key = 'AUTH_TOKEN';
  localStorage = new LocalStorage();

  constructor() {
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
    if (typeof window === 'undefined') return this.token.set(this.key, val); // ssr dealing
    this.localStorage.set(this.key, val);
  }

  getToken() {
    if (typeof window === 'undefined') return this.token.get(this.key) || '';
    return this.localStorage.get(this.key);
  }
}

export const AuthToken = new AuthTokenClass();
