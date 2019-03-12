import Singleton from '@/utils/Singleton'

/**
 * @param {String|Object<{type:String, message: String}>} symbol
 * @param {String} type
 * */
function getKey(symbol, type = 'log') {
  return typeof symbol === 'string'
    ? `${type}-${symbol}`
    : `${type}-${symbol.type}:${symbol.message}`
}

export default class LogOnce {
  /**
   * @param {String|Object<{type:String, message: String}>} symbol
   * */
  static error(symbol) {
    Singleton.onceRun(() => console.error(symbol), getKey(symbol, 'error'))
  }

  /**
   * @param {String|Object<{type:String, message: String}>} symbol
   * */
  static warn(symbol) {
    Singleton.onceRun(() => console.warn(symbol), getKey(symbol, 'warn'))
  }

  /**
   * @param {String|Object<{type:String, message: String}>} symbol
   * */
  static log(symbol) {
    Singleton.onceRun(() => console.warn(symbol), getKey(symbol, 'log'))
  }
}
