export function isMobile() {
  const ua = typeof window !== 'undefined' ? navigator.userAgent : ''
  const reg = /Android|webOS|iPhone|iPod|iPad|BlackBerry|Windows Phone/i
  return reg.test(ua)
}

export function isWeiXin() {
  const ua = typeof window !== 'undefined' ? navigator.userAgent : ''
  const reg = /MicroMessenger/i
  return reg.test(ua)
}

export function isAndroid() {
  const ua = typeof window !== 'undefined' ? navigator.userAgent : ''
  const reg = /(Android|Adr)/i
  return reg.test(ua)
}
