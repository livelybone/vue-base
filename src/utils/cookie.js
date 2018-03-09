export default class Cookie {
  static set(key, val, isSessionLevel) {
    const exp = new Date();
    let cookie = key + '=' + encodeURIComponent(val);
    if (!isSessionLevel) { // 如果不是会话级（会话级的cookie，关闭浏览器则过期），则设置过期时间
      const Days = 1;
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);       // 一天之后过时，失效
      cookie += ';expires=' + exp.toUTCString();
    }
    document.cookie = cookie
  }

  static get(key) {
    let arr;
    const reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');

    if ((arr = document.cookie.match(reg))) {
      return decodeURIComponent(arr[2])
    } else return null
  }

  static del(key) {
    const exp = new Date();
    exp.setTime(exp.getTime() - 1);
    const val = Cookie.get(key);
    if (val !== null) {
      document.cookie = key + '=' + val + ';expires=' + exp.toUTCString()
    }
  }
}
