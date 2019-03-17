import App from '@/App'
import { createStore } from '@/data/store'
import { initialExtensions } from '@/extensions/Extensions'
import register from '@/global-register'
import { createRouter } from '@/router'
import { isBrowser } from '@/utils/UserAgent'
import RemInit from '@livelybone/rem-init'
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
// use babel-polyfill
// import 'babel-polyfill'

if (isBrowser) {
  RemInit({
    pageNoScale: /noScale/i.test(window.location.search),
  })
}

Vue.config.productionTip = false

const { i18n } = initialExtensions()
register()

export function createApp() {
  // 创建 router 和 store 实例
  const store = createStore()
  const router = createRouter(i18n, store)
  // 同步路由状态(route state)到 store
  sync(store, router)
  // 创建应用程序实例，将 router 和 store 注入
  const app = new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
  })
  return { app, router, store }
}
