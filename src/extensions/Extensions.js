import CachePlugin from '@/extensions/CachePlugin'
import HttpPlugin from '@/extensions/HttpPlugin'
import { initialI18n } from '@/extensions/Langs'
import Vue from 'vue'
import Meta from 'vue-meta'

export function initialExtensions() {
  Vue.use(HttpPlugin)
  Vue.use(CachePlugin)
  Vue.use(Meta)
  const i18n = initialI18n()
  return { i18n }
}
