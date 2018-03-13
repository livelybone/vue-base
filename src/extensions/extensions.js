import Vue from "vue";
import bus from 'extensions/bus'
import http from 'extensions/http'
import cache from 'extensions/cache'

export function initialExtensions() {
  Vue.use(bus);
  Vue.use(http);
  Vue.use(cache);
}
