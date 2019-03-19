import { Observer } from '@livelybone/simple-observer'
import { Storage } from '@livelybone/storage'

let next = null

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

// Token change caused by other windows of the browser
AuthToken.tokenChange = new Observer(n => {
  next = n
})

AuthToken.storage =
  typeof window !== 'undefined' ? new Storage(true) : { addHandler: () => '' }

// Storage Event
AuthToken.storage.addHandler(({ key }) => {
  if (key === AuthToken.key) {
    const token = AuthToken.getToken()
    next(token)
  }
})

export default AuthToken
