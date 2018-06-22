import bus from 'extensions/bus';
import CachePlugin from 'extensions/cache';
import HttpPlugin from 'extensions/http';
import { initialI18n } from 'extensions/i18n';
import Vue from 'vue';

export function initialExtensions() {
  Vue.use(bus);
  Vue.use(HttpPlugin);
  Vue.use(CachePlugin);
  const i18n = initialI18n();
  return { i18n };
}
