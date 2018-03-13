import { http } from 'extensions/http'

export default class User {
  static register({phoneNumber, password, verifyCode}) {
    return http.postForm('/user/register', {phoneNumber, password, verifyCode})
  }
};
