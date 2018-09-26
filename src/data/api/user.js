import { Http } from 'extensions/http'

export default class User {
  static register({ phoneNumber, password, verifyCode }) {
    return Http.postForm('/user/register', { phoneNumber, password, verifyCode })
  }
};
