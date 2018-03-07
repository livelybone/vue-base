// 全局状态管理 store
import Vue from 'vue'

export default function initialStore(state) {
  Vue.prototype.$store = new Store(state)
}

class Store {
  state = {};

  constructor(state) {
    this.state = state
  }

  commit(key, val) {
    const value = this.state[key];
    if (value instanceof Array) this.state[key] = [...value, ...val];
    else this.state[key] = {...value, ...val};
    this.state = {...this.state};
  }
}
