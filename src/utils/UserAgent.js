import isAndroid from 'is-android'

export function isWeiXin() {
  const ua = typeof window !== 'undefined' ? navigator.userAgent : ''
  const reg = /MicroMessenger/i
  return reg.test(ua)
}

export { isAndroid }
