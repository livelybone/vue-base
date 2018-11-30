/**
 * 语言国际化
 * */
/* eslint-disable no-param-reassign */
import LangMap from 'assets/lang/LangMap.json'
import Vue from 'vue'
import VueI18n from 'vue-i18n'

const getResources = lang => import(`assets/lang/${lang}` /* webpackChunkName: "Lang-[request]" */)
const browserLang = typeof window !== 'undefined' && navigator.language.toLowerCase() === 'zh-cn' ? 'zh-HANS' : 'en-US'
const loadedLanguages = []

export const Langs = Object.keys(LangMap)
  .map(key => ({ name: LangMap[key], value: key }))

function setI18nLanguage(i18n, lang) {
  i18n.locale = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync(i18n, lang) {
  if (!LangMap[lang]) throw new Error(`The language '${lang}' has not been included in LangMap.json`)
  if (!loadedLanguages.includes(lang)) {
    return getResources(lang).then((msgs) => {
      i18n.setLocaleMessage(lang, msgs.default)
      loadedLanguages.push(lang)
      return setI18nLanguage(i18n, lang)
    })
  }
  if (i18n.locale === lang) return Promise.resolve(lang)
  return Promise.resolve(setI18nLanguage(i18n, lang))
}

export function initialI18n(lang) {
  Vue.use(VueI18n)

  const locale = lang || browserLang

  return new VueI18n({
    locale,
    messages: {},
  })
}
