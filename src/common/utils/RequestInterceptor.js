import { rootUrl } from 'config/config'

export function divRootUrl(url) {
  return url.replace(rootUrl.replace(/\/$/, ''), '')
}

export function pathJoin(...urls) {
  return urls.reduce(
    (pre, url) => `${pre.replace(/\/*$/, '')}/${url.replace(/^\/*/, '')}`,
    '/',
  )
}

export function joinWithRootUrl(...urls) {
  return pathJoin(rootUrl, ...urls)
}

export function queryString(query, encode) {
  let str = ''
  Object.keys(query).forEach(i => {
    str += `&${i}=${encode ? encodeURIComponent(query[i]) : query[i]}`
  })
  return str.slice(1)
}

export function getUrl(url, query) {
  if (!query || Object.keys(query).length <= 0) return url
  let key = url + (url.indexOf('?') >= 0 ? '&' : '?')
  if (query) key += queryString(query, true)
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

export function pageConfigConvert({ page, pageSize }) {
  return { page, pageSize }
}
