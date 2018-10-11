import isAndroid from 'is-android'
import isMobile from 'is-mobile'

export function isWeiXin() {
  const ua = typeof window !== 'undefined' ? navigator.userAgent : ''
  const reg = /MicroMessenger/i
  return reg.test(ua)
}

export { isAndroid, isMobile }
