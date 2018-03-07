export default class Cookie {
  static set (key, val) {
    let Days = 30;
    let exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    // 一天之后过时，失效
    document.cookie = key + '=' + encodeURIComponent(val) + ';expires=' + exp.toGMTString()
  }

  static get (key) {
    let arr;
    let reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');

    if ((arr = document.cookie.match(reg))) {
      return decodeURIComponent(arr[2])
    } else return null
  }

  static del (key) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let val = Cookie.get(key);
    if (val !== null) {
      document.cookie = key + '=' + val + ';expires=' + exp.toGMTString()
    }
  }
}
