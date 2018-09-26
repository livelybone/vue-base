/**
 * 语言国际化
 * */
import { CN } from 'assets/lang/CN/index'
import { CNT } from 'assets/lang/CNT/index'
import Vue from 'vue'
import VueI18n from 'vue-i18n'

const messages = {
  CN,
  CNT,
}

export const Langs = Object.keys(messages)
  .map(key => ({ name: messages[key].lang_name, value: key }))

export function initialI18n() {
  Vue.use(VueI18n)
  return new VueI18n({
    locale: 'CN',
    messages,
  })
}
