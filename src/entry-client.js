/* eslint-disable no-underscore-dangle */
import { createApp } from '@/main'

const { app, router, store } = createApp()

router.onReady(() => {
  // `__INITIAL_STATE__` provided by server render
  if (window.__INITIAL_STATE__) store.replaceState(window.__INITIAL_STATE__)
  app.$mount('#app')
})
