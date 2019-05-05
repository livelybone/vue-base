import AuthToken from '@/api/AuthToken'
import { Http } from '@/common/extensions/HttpPlugin'

export default class User {
  static register({ username, password, verifyCode }) {
    return Http.postForm('/user/register', {
      username,
      password,
      verifyCode,
    })
  }

  static getUser() {
    // get infos of user
    return Http.get('/user/info').then(
      user => user,
      e => {
        AuthToken.setToken('')
        throw e
      },
    )
  }

  static signIn({ username, password }) {
    return Http.post('/login', { username, password }).then(res => {
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
