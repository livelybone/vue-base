import { Observer } from '@livelybone/simple-observer'
import { Storage } from '@livelybone/storage'

/**
 * auth_token
 */
class AuthToken {
  static setToken(val) {
    this.storage.set(this.key, val)
  }

  static getToken() {
    return this.storage.get(this.key)
  }
}

AuthToken.key = 'AUTH_TOKEN'

let next = null

AuthToken.tokenChange = new Observer(n => {
  next = n
})

AuthToken.storage = new Storage(true)

AuthToken.storage.addHandler(next)

export default AuthToken
