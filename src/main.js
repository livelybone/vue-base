import Vue from 'vue'
import App from '@/App'
import { createStore } from 'data/store'
import { createRouter } from '@/router'
import { sync } from 'vuex-router-sync'
import register from '@/global-register'
import { initialExtensions } from "@/extensions/extensions";

Vue.config.productionTip = false;

initialExtensions();
register();

/* eslint-disable no-new */
export function createApp() {
  // 创建 router 和 store 实例
  const router = createRouter();
  const store = createStore();
  // 同步路由状态(route state)到 store
  sync(store, router);
  // 创建应用程序实例，将 router 和 store 注入
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });
  return {app, router, store}
}
