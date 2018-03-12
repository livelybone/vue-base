export function getUrl(url, params) {
  if (!params || Object.keys(params).length <= 0) return url;
  let key = url.indexOf('?') >= 0 ? url + '&' : url + '?';
  if (params) key += queryString(params, true);
  return key
}

export function queryString(params, encode) {
  let str = '';
  Object.keys(params).map(key => str += '&' + i + '=' + (encode ? encodeURIComponent(params[key]) : params[key]));
  return str.slice(1)
}

export function convertToFormData(obj) {
  const data = new FormData();
  Object.keys(obj).map(key => {
    if (obj[key] instanceof FileList) { // 多张图片
      [].map.call(obj[key], file => data.append(key, file))
    } else if (obj[key] instanceof Array && (obj[key][0] instanceof File || obj[key][0] instanceof FileList)) { // 多张图片
      obj[key].map(item => {
        if (item instanceof FileList) [].map.call(item, file => data.append(key, file));
        else data.append(key, item);
      })
    } else if ((typeof obj[key]).indexOf('object') >= 0) {
      data.append(key, JSON.stringify(obj[key]))
    } else {
      data.append(key, obj[key])
    }
  });
  return data
}

export class MY_URL {
  constructor(url) {
    this.href = url;
  }

  toString() {
    return this.href;
  }

  get href() {
    return this.origin + this.pathname + this.search + '#' + this.hash
  }

  set href(val) {
    this.hash = (val.match(/#(\S+)/) || [])[1] || "";
    this.host = (val.match(/:\/\/(\S+(:\d+))\//) || [])[1] || "127.0.0.1";
    this.hostname = (val.match(/:\/\/(\S+):/) || [])[1] || "127.0.0.1";
    this.origin = (val.match(/(https?:\/\/\S+)\//) || [])[1] || "http://127.0.0.1";
    this.pathname = (val.match(/https?:\/\/\S+(\/[^?#]+)(\?|#|$)/) || [])[1] || "/";
    this.port = (val.match(/:(\d+)\//) || [])[1] || "";
    this.protocol = (val.match(/(https?:)/) || [])[1] || "http:";
    this.search = (val.match(/(\?[^#]+)(#?\S*)$/) || [])[1] || "";
    this.password = "";
    this.username = "";
  }
}

