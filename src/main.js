import Vue from 'vue'
import App from './App'
import store from 'data/store'
import router from './router'
import register from './global-register'
import { initialExtensions } from "@/extensions/extensions";

Vue.config.productionTip = false;

initialExtensions();
register();

/* eslint-disable no-new */
const root = new Vue({
  router,
  store,
  render: h => h(App)
});

document.addEventListener('DOMContentLoaded', () => {
  // prod: webpack HtmlWebpackPlugin 配置 {inject: 'head',chunksSortMode: 'dependency'}，使得js代码被插入到了 head 标签，先于 body DOM 生成之前运行，因此使用 DOMContentLoaded 事件处理
  root.$mount('#app')
});
