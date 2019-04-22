import User from '@/data/api/User'
import { USER } from '@/data/store/mutations-types'
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
    return User.getUser().then(res =>
      commit(USER.GET_USER_INFO, {
        ..._state.info,
        role: 'client',
        ...res,
      }),
    )
  },
}

export const user = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
