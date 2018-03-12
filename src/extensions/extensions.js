import Vue from "vue";
import bus from 'extensions/bus'
import http from 'extensions/http'
import cache from 'extensions/cache'
import store from 'extensions/store'

export function initialExtentions(){
  Vue.use(bus);
  Vue.use(http);
  Vue.use(cache);
  Vue.use(store);
}
