/**
 * 语言国际化
 * */
/* eslint-disable no-param-reassign */
import { langKeys, LangMap, Langs } from '@/assets/lang/LangMap'
import { isBrowser } from '@/utils/UserAgent'
import { Cookie } from '@livelybone/storage'
import Vue from 'vue'
import VueI18n from 'vue-i18n'

function setI18nLanguage(i18n, lang) {
  i18n.locale = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

function getBrowserLang() {
  if (!isBrowser) return 'en'
  return (navigator.language || navigator.userLanguage).toLowerCase() ===
    'zh-cn'
    ? 'zh-hans'
    : 'en'
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
    return LangMap[language].module().then(msgs => {
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
    return this.storage.get(this.key)
  }

  static setLang(val, vm = null) {
    return vm
      ? loadLanguageAsync(vm.$i18n, val).then(lang => {
          this.storage.set(this.key, lang)
        })
      : Promise.reject(new Error('Param vm is null'))
  }
}

// use cookie instead of localStorage to make sending lang to server possible
LangStore.storage = isBrowser ? Cookie : new Map()

LangStore.key = 'lang'
LangStore.langOptions = Langs
LangStore.langKeys = langKeys

export function initialI18n(lang) {
  Vue.use(VueI18n)
  Vue.prototype.$lang = LangStore

  const locale = lang || LangStore.getLang() || browserLang

  return new VueI18n({
    locale,
    messages: {},
  })
}
