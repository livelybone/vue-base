import CachePlugin from '@/extensions/CachePlugin'
import HttpPlugin from '@/extensions/HttpPlugin'
import { initialI18n } from '@/extensions/Langs'
import Vue from 'vue'

export function initialExtensions() {
  Vue.use(HttpPlugin)
  Vue.use(CachePlugin)
  const i18n = initialI18n()
  return { i18n }
}
