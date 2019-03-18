import isAndroid from 'is-android'

export const isBrowser =
  typeof window !== 'undefined' &&
  typeof Window !== 'undefined' &&
  window &&
  Window &&
  window instanceof Window

export function isWeiXin() {
  const ua = isBrowser ? navigator.userAgent : ''
  const reg = /MicroMessenger/i
  return reg.test(ua)
}

export { isAndroid }
