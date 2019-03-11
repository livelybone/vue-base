// 全局状态管理 store, 如果不使用 Vuex，可以用它简单管理全局状态
const data = {
  user: {},
  admin: {},
}

export class Store {
  static commit(key, val) {
    this.state[key] = val
  }
}

Store.state = data

const StorePlugin = {}

StorePlugin.install = Vue => {
  Vue.prototype.$store = Store
}

export default StorePlugin
