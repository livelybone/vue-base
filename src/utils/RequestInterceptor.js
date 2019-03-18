export function queryString(params, encode) {
  let str = ''
  Object.keys(params).forEach(i => {
    str += `&${i}=${encode ? encodeURIComponent(params[i]) : params[i]}`
  })
  return str.slice(1)
}

export function getUrl(url, params) {
  if (!params || Object.keys(params).length <= 0) return url
  let key = url + (url.indexOf('?') >= 0 ? '&' : '?')
  if (params) key += queryString(params, true)
  return key
}

export function convertToFormData(obj) {
  const data = new FormData()
  Object.keys(obj).forEach(i => {
    if (
      obj[i] instanceof FileList ||
      (obj[i] instanceof Array && obj[i].some(f => f instanceof File))
    ) {
      // 多张图片
      Array.prototype.forEach.call(obj[i], file => data.append(i, file))
    } else if (typeof obj[i] === 'object' && !(obj[i] instanceof File)) {
      data.append(i, JSON.stringify(obj[i]))
    } else {
      data.append(i, obj[i])
    }
  })
  return data
}
