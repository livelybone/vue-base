import AuthToken from '@/data/api/AuthToken'
import { Http } from '@/extensions/HttpPlugin'

export default class User {
  static register({ phoneNumber, password, verifyCode }) {
    return Http.postForm('/user/register', {
      phoneNumber,
      password,
      verifyCode,
    })
  }

  static getUser() {
    // 获取用户信息
    return Http.get('/user/myUserInfo').then(
      user => user,
      e => {
        AuthToken.setToken('')
        throw e
      },
    )
  }

  static getAdminUser() {
    // 获取用户信息
    return Http.get('/user/admin/myUserInfo').then(
      user => user,
      e => {
        AuthToken.setToken('')
        throw e
      },
    )
  }

  static signIn({ phoneNumber, password }) {
    return Http.post(
      `/login?phoneNumber=${phoneNumber}&password=${password}`,
    ).then(res => {
      AuthToken.setToken(res)
      return res
    })
  }

  static signOut() {
    return new Promise(resolve => {
      AuthToken.setToken('')
      resolve()
    })
  }
}
