// If the program is simple, you can use this instead of `vuex`
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
