import Vue from 'vue'

export default class User {
  constructor() {
  }

  static register({phoneNumber, password, verifyCode}) {
    return Vue.prototype.$http.postForm('/user/register', {phoneNumber, password, verifyCode})
  }
}
