import { Storage } from '@livelybone/storage'
import { Http } from 'extensions/http'

/**
 * auth_token
 */
class AuthTokenClass {
  key = 'AUTH_TOKEN'

  localStorage = new Storage()

  getUser() {
    // 获取用户信息
    return Http.get('/user/myUserInfo').then(user => user, (e) => {
      this.setToken('')
      throw e
    })
  }

  getAdminUser() {
    // 获取用户信息
    return Http.get('/user/myUserInfo').then(user => user, (e) => {
      this.setToken('')
      throw e
    })
  }

  signIn({ phoneNumber, password }) {
    return Http.post(`/login?phoneNumber=${phoneNumber}&password=${password}`).then((res) => {
      this.setToken(res)
      return res
    })
  }

  signInAdmin({ phoneNumber, password }) {
    return Http.post(`/manager/login?phoneNumber=${phoneNumber}&password=${password}`).then((res) => {
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
