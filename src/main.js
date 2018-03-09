import Vue from 'vue'
import App from './App'
import router from './router'
import initialExtensions from 'extensions/extensions'
import register from './global-register'

Vue.config.productionTip = false;

initialExtensions();
register();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
