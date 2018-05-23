import Vue from "vue";
import bus from 'extensions/bus'
import http from 'extensions/http'
import cache from 'extensions/cache'
import { initialI18n } from "extensions/i18n";

export function initialExtensions() {
  Vue.use(bus);
  Vue.use(http);
  Vue.use(cache);
  const i18n=initialI18n();
  return {i18n};
}
