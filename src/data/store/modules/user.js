import Vue from "vue";
import { USER } from "data/store/mutations-types";
import { AuthToken } from "data/api/auth-token";

const state = {
  info: {},
};

const getters = {
  id(state) {
    return state.info.id
  }
};

const mutations = {
  [USER.GET_USER_INFO](state, info) {
    Vue.set(state, 'info', info)
  }
};

const actions = {
  getUserInfo({commit, state}) {
    commit(USER.GET_USER_INFO, {});
    return AuthToken.getUser().then(res => commit(USER.GET_USER_INFO, {role: 'client', ...res}))
  },
  getAdminUserInfo({commit, state}) {
    commit(USER.GET_USER_INFO, {});
    return AuthToken.getAdminUser().then(res => commit(USER.GET_USER_INFO, {role: 'admin', ...res}))
  }
};

export const user = {
  namespaced: true, // 增加命名空间，外部使用时需要指明命名空间（如果没有外部冲突，可以去掉）
  state,
  getters,
  mutations,
  actions,
};

