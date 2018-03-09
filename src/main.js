import Vue from 'vue'
import App from './App'
import router from './router'
import initialExtensions from 'extensions/extensions'
import register from './global-register'

Vue.config.productionTip = false;

initialExtensions();
register();

/* eslint-disable no-new */
const root = new Vue({
  router,
  render: h => h(App)
});

document.addEventListener('DOMContentLoaded', () => {
  // prod: webpack HtmlWebpackPlugin 配置 {inject: 'head',chunksSortMode: 'dependency'}，使得js代码被插入到了 head 标签，先于 body DOM 生成之前运行，因此使用 DOMContentLoaded 事件处理
  root.$mount('#app')
});
