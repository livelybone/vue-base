import Vue from 'vue'
import App from './App'
import initialExtensions from 'extensions/extensions'
import register from './global-register'
import router from './router'

Vue.config.productionTip = false;

initialExtensions();
register();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
