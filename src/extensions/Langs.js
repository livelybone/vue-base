/**
 * 语言国际化
 * */
/* eslint-disable no-param-reassign */
import { Storage } from '@livelybone/storage'
import LangMap from 'assets/lang/LangMap'
import Vue from 'vue'
import VueI18n from 'vue-i18n'

const langKeys = Object.keys(LangMap)
export const Langs = langKeys
  .map(key => ({ name: LangMap[key].name, value: key }))

function setI18nLanguage(i18n, lang) {
  i18n.locale = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

function getBrowserLang() {
  if (typeof window === 'undefined') return 'en-US'
  if (window.INIT_STATE && window.INIT_STATE.siteInfo && window.INIT_STATE.siteInfo.language) {
    return window.INIT_STATE.siteInfo.language
  }
  return navigator.language.toLowerCase() === 'zh-cn' ? 'zh-HANS' : 'en-US'
}

const browserLang = getBrowserLang()
const loadedLanguages = []

export function loadLanguageAsync(i18n, lang) {
  let language = lang
  if (!LangMap[lang]) {
    console.error(`The language '${lang}' has not been included in LangMap.js`)
    language = browserLang || langKeys[0]
  }
  if (!loadedLanguages.includes(language)) {
    return LangMap[language].module().then((msgs) => {
      i18n.setLocaleMessage(language, msgs.default)
      loadedLanguages.push(language)
      return setI18nLanguage(i18n, language)
    })
  }
  if (i18n.locale === language) return Promise.resolve(language)
  return Promise.resolve(setI18nLanguage(i18n, language))
}

export class LangStore {
  static getLang() {
    const lang = this.localStorage.get(this.key)
    return LangMap[lang] ? lang : langKeys[0]
  }

  static setLang(val, vm = null) {
    return vm ? loadLanguageAsync(vm.$i18n, val).then((lang) => {
      this.localStorage.set(this.key, lang)
    }) : Promise.reject(new Error('Param vm is null'))
  }
}

LangStore.localStorage = new Storage()

LangStore.key = 'lang'

export function initialI18n(lang) {
  Vue.use(VueI18n)
  Vue.prototype.$lang = LangStore

  const locale = lang || LangStore.getLang() || browserLang

  return new VueI18n({
    locale,
    messages: {},
  })
}
