// 全局状态管理 store
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

export const store = new Store();

const StorePlugin = {};
StorePlugin.install = (Vue, options) => {
  Vue.prototype.$store = store;
};

export default StorePlugin;
