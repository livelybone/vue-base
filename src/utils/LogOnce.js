import Singleton from 'utils/Singleton'

export default class LogOnce {
  /**
   * @param {String|Object<{type:String, message: String}>} symbol
   * */
  static error(symbol) {
    const key =
      typeof symbol === 'string' ? `error-${symbol}` : `error-${symbol.type}:${symbol.message}`
    Singleton.onceRun(() => console.error(symbol), key)
  }

  /**
   * @param {String|Object<{type:String, message: String}>} symbol
   * */
  static warn(symbol) {
    const key =
      typeof symbol === 'string' ? `warn-${symbol}` : `warn-${symbol.type}:${symbol.message}`
    Singleton.onceRun(() => console.warn(symbol), key)
  }

  /**
   * @param {String|Object<{type:String, message: String}>} symbol
   * */
  static log(symbol) {
    const key =
      typeof symbol === 'string' ? `log-${symbol}` : `log-${symbol.type}:${symbol.message}`
    Singleton.onceRun(() => console.warn(symbol), key)
  }
}

LogOnce.store = new Map()
