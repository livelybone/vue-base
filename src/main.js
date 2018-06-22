import { initialExtensions } from '@/extensions/extensions';
import store from 'data/store';
import Vue from 'vue';
import App from './App';
import register from './global-register';
import { createRouter } from './router';

Vue.config.productionTip = false;

const { i18n } = initialExtensions();
register();

/* eslint-disable no-new */
const router = createRouter(store);
const root = new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
});

document.addEventListener('DOMContentLoaded', () => {
  // prod: webpack HtmlWebpackPlugin 配置 {inject: 'head',chunksSortMode: 'dependency'}，
  // 使得js代码被插入到了 head 标签，先于 body DOM 生成之前运行，因此使用 DOMContentLoaded 事件处理
  root.$mount('#app');
});
