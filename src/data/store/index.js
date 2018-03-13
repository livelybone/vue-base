import Vue from 'vue';
import Vuex from 'vuex';
import { user } from "data/store/modules/user";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {user}
});

export default store
