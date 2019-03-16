/* eslint-disable prettier/prettier */
export const LangMap = {
  'zh-hans': {
    name: '简体中文',
    module: () => import('@/assets/lang/zh-hans/index.js' /* webpackChunkName: "Lang-zh-hans" */),
  },
  'en': {
    name: 'English',
    module: () => import('@/assets/lang/en/index.js' /* webpackChunkName: "Lang-en" */),
  },
  'zh-hant': {
    name: '繁体中文',
    module: () => import('@/assets/lang/zh-hant/index.js' /* webpackChunkName: "Lang-zh-hant" */),
  },
}

export const langKeys = Object.keys(LangMap)

export const Langs = langKeys.map(key => ({
  name: LangMap[key].name,
  value: key,
}))
