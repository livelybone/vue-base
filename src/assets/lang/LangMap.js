/* eslint-disable prettier/prettier */
export default {
  'zh-hans': {
    name: '简体中文',
    module: () => import('@/assets/lang/zh-hans' /* webpackChunkName: "Lang-zh-hans" */),
  },
  'en': {
    name: 'English',
    module: () => import('@/assets/lang/en' /* webpackChunkName: "Lang-en" */),
  },
  'zh-hant': {
    name: '繁体中文',
    module: () => import('@/assets/lang/zh-hant' /* webpackChunkName: "Lang-zh-hant" */),
  },
}
