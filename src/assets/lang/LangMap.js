export default {
  'en-US': {
    name: 'English',
    module: () => import('assets/lang/en-US' /* webpackChunkName: "Lang-en-US" */),
  },
  'zh-HANT': {
    name: '繁体中文',
    module: () => import('assets/lang/zh-HANT' /* webpackChunkName: "Lang-zh-HANT" */),
  },
  'zh-HANS': {
    name: '简体中文',
    module: () => import('assets/lang/zh-HANS' /* webpackChunkName: "Lang-zh-HANS" */),
  },
}
