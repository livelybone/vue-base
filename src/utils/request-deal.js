export function getUrl(url, params) {
  if (!params || Object.keys(params).length <= 0) return url;
  let key = url.indexOf('?') >= 0 ? url + '&' : url + '?';
  if (params) key += queryString(params, true);
  return key
}

export function queryString(params, encode) {
  let str = '';
  for (let i in params) {
    if (params.hasOwnProperty(i)) {
      str += '&' + i + '=' + (encode ? encodeURIComponent(params[i]) : params[i])
    }
  }
  return str.slice(1)
}

export function convertToFormData(obj) {
  const data = new FormData();
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (obj[i] instanceof FileList) {
        data.append(i, obj[i][0])
      } else if ((typeof obj[i]).indexOf('object') >= 0) {
        data.append(i, JSON.stringify(obj[i]))
      } else {
        data.append(i, obj[i])
      }
    }
  }
  return data
}
