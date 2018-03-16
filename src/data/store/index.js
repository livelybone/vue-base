import Vue from 'vue';
import Vuex from 'vuex';
import { user } from "data/store/modules/user";

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {user}
  });
}
