import { user } from '@/data/store/modules/user'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
      token: '',
    },
    getters: {},
    mutations: {
      setToken(state, token) {
        Vue.set(state, 'token', token)
      },
    },
    actions: {},
    modules: { user },
  })
}
