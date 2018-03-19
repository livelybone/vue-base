import Vue from 'vue';
import Vuex from 'vuex';
import { user } from "data/store/modules/user";

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state: {
      token: ''
    },
    getters: {},
    mutations: {
      setToken(state, token) {
        Vue.set(state, 'token', token);
      }
    },
    actions: {},
    modules: {user}
  });
}
