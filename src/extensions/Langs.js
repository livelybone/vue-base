/**
 * 语言国际化
 * */
/* eslint-disable no-param-reassign */
import LangMap from 'assets/lang/LangMap'
import Vue from 'vue'
import VueI18n from 'vue-i18n'

const browserLang = typeof window !== 'undefined' && navigator.language.toLowerCase() === 'zh-cn' ? 'zh-HANS' : 'en-US'
const loadedLanguages = []

export const Langs = Object.keys(LangMap)
  .map(key => ({ name: LangMap[key].name, value: key }))

function setI18nLanguage(i18n, lang) {
  i18n.locale = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync(i18n, lang) {
  if (!LangMap[lang]) throw new Error(`The language '${lang}' has not been included in LangMap.json`)
  if (!loadedLanguages.includes(lang)) {
    return LangMap[lang].module().then((msgs) => {
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
