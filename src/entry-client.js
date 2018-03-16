import { createApp } from '@/main'

const {app, router, store} = createApp();

router.onReady(() => {
  if (window.__INITIAL_STATE___) store.replaceState(window.__INITIAL_STATE__);
  app.$mount('#app');
});
