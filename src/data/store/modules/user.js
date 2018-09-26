import { AuthToken } from 'data/api/auth-token'
import { USER } from 'data/store/mutations-types'
import Vue from 'vue'

const state = {
  info: {},
}

const getters = {
  id(_state) {
    return _state.info.id
  },
}

const mutations = {
  [USER.GET_USER_INFO](_state, info) {
    Vue.set(_state, 'info', info)
  },
}

const actions = {
  getUserInfo({ commit, _state }) {
    commit(USER.GET_USER_INFO, {})
    return AuthToken.getUser().then(res => commit(USER.GET_USER_INFO, {
      ..._state.info,
      role: 'client',
      ...res,
    }))
  },
  getAdminUserInfo({ commit, _state }) {
    commit(USER.GET_USER_INFO, {})
    return AuthToken.getAdminUser().then(res => commit(USER.GET_USER_INFO, {
      ..._state.info,
      role: 'admin',
      ...res,
    }))
  },
}

export const user = {
  namespaced: true, // 增加命名空间，外部使用时需要指明命名空间（如果没有外部冲突，可以去掉）
  state,
  getters,
  mutations,
  actions,
}
