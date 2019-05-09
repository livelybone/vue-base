/* eslint-disable no-underscore-dangle */
import { createApp } from '@/main'

const { app, router, store } = createApp()

// `__INITIAL_STATE__` provided by server render
if (window.__INITIAL_STATE__) store.replaceState(window.__INITIAL_STATE__)
router.onReady(() => {
  app.$mount('#app')
})
