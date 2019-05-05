import App from '@/App'
import { createStore } from '@/api/store'
import { initialExtensions } from '@/common/extensions/Extensions'
import register from '@/global-register'
import { createRouter } from '@/router'
import { isBrowser } from '@/common/utils/UserAgent'
import RemInit from '@livelybone/rem-init'
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
/** use babel-polyfill */
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
  // Create the router and store instances
  const store = createStore()
  const router = createRouter(i18n, store)
  // Synchronize route state to store
  sync(store, router)
  // Create an application instance, injecting router and store
  const app = new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
  })
  return { app, router, store }
}
