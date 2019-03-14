// 全局状态管理 store, 如果不使用 Vuex，可以用它简单管理全局状态
import Vue from 'vue'

const data = {
  user: { name: 'a' },
  admin: {},
}

export const Store = {
  state: data,
  commit(key, val) {
    Vue.set(data, key, val)
  },
}

const StorePlugin = {
  install(V) {
    V.mixin({
      data() {
        return {
          store: Store,
        }
      },
    })
  },
}

export default StorePlugin
