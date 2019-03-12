import isAndroid from 'is-android'
import { isBrowser } from '@/utils/Utils'

export function isWeiXin() {
  const ua = isBrowser ? navigator.userAgent : ''
  const reg = /MicroMessenger/i
  return reg.test(ua)
}

export { isAndroid }
