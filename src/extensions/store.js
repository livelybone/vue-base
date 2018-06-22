// 全局状态管理 store, 如果不使用 Vuex，可以用它简单管理全局状态
const data = {
  user: {},
  admin: {},
};

class Store {
  state = {};

  constructor(state) {
    this.state = state;
  }

  commit(key, val) {
    const value = this.state[key];
    if (value instanceof Array) this.state[key] = [...value, ...val];
    else this.state[key] = { ...value, ...val };
    this.state = { ...this.state };
  }
}

export const store = new Store(data);

const StorePlugin = {};
StorePlugin.install = (Vue) => {
  Vue.prototype.$store = store;
};

export default StorePlugin;
