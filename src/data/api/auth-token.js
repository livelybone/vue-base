/**
 * auth_token
 */
import { http } from 'extensions/http'
import LocalStorage from 'utils/localStorage'

class AuthTokenClass {
  key = 'AUTH_TOKEN'

  localStorage = new LocalStorage()

  getUser() {
    // 获取用户信息
    return http.get('/user/myUserInfo').then(user => user, (e) => {
      this.setToken('')
      throw e
    })
  }

  getAdminUser() {
    // 获取用户信息
    return http.get('/user/myUserInfo').then(user => user, (e) => {
      this.setToken('')
      throw e
    })
  }

  signIn({ phoneNumber, password }) {
    return http.post(`/login?phoneNumber=${phoneNumber}&password=${password}`).then((res) => {
      this.setToken(res)
      return res
    })
  }

  signInAdmin({ phoneNumber, password }) {
    return http.post(`/manager/login?phoneNumber=${phoneNumber}&password=${password}`).then((res) => {
      this.setToken(res)
      return res
    })
  }

  signOut() {
    return new Promise((resolve) => {
      this.setToken('')
      resolve()
    })
  }

  setToken(val) {
    this.localStorage.set(this.key, val)
  }

  getToken() {
    return this.localStorage.get(this.key)
  }
}

export const AuthToken = new AuthTokenClass()
