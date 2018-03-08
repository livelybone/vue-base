export function isMobile() {
  let ua = typeof window !== 'undefined' ? navigator.userAgent : '';
  let reg = /Android|webOS|iPhone|iPod|iPad|BlackBerry|Windows Phone/i;
  return reg.test(ua);
}

export function isWeiXin() {
  let ua = typeof window !== 'undefined' ? navigator.userAgent : '';
  let reg = /MicroMessenger/i;
  return reg.test(ua);
}

export function isAndroid() {
  let ua = typeof window !== 'undefined' ? navigator.userAgent : '';
  let reg = /(Android|Adr)/i;
  return reg.test(ua);
}
