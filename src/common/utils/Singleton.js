export default class Singleton {
  /**
   * @param { Function<Promise> } proFn
   * @param { String|Number } key
   * @return Promise
   * */
  static promise(proFn, key = '') {
    const k = key ? `promise-${key}` : proFn
    if (!Singleton.keys.has(k)) {
      Singleton.keys.set(
        k,
        proFn().then(
          res => {
            Singleton.keys.delete(k)
            return res
          },
          e => {
            Singleton.keys.delete(k)
            throw e
          },
        ),
      )
    }
    return Singleton.keys.get(k)
  }

  /**
   * @param { Function<Promise> } proFn
   * @param { String|Number } key
   * @return Promise
   * */
  static promiseForever(proFn, key = '') {
    const k = key ? `promise-forever-${key}` : proFn
    if (!Singleton.keys.has(k)) {
      Singleton.keys.set(k, proFn())
    }
    return Singleton.keys.get(k)
  }

  /**
   * @param { String|Number } key
   * @param { Object } defaultValue
   * @return any
   * */
  static obj(key, defaultValue) {
    const k = `object-${key || 'default'}`
    if (!Singleton.keys.has(k)) {
      Singleton.keys.set(k, defaultValue || {})
    }
    return Singleton.keys.get(k)
  }

  /**
   * @param { String|Number } key
   * @param { Function } createFn
   * @return { Function } clear function
   * */
  static runInterval(key, createFn) {
    const k = `timer-${key || 'default'}`
    if (Singleton.keys.has(k)) {
      // clear old interval
      Singleton.keys.get(k)()
    }
    const id = createFn()
    Singleton.keys.set(k, () => {
      clearInterval(id)
      Singleton.keys.delete(k)
    })
    return Singleton.keys.get(k)
  }

  /**
   * @param { Function } fn
   * @param { String|Number } key
   * */
  static onceRun(fn, key = '') {
    const k = key ? `once-run-${key}` : fn
    if (!Singleton.keys.has(k)) {
      Singleton.keys.set(k, fn())
    }
  }
}

Singleton.keys = new Map()
