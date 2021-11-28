import {reqUserInfoBySession, reqLogout} from "api"

export default {
  namespaced: true, // 开启命名空间
  state: {
    userInfo: {}  // 用户信息
  },
  actions: {
    // 记录用户信息
    recordUserInfo({commit}, userInfo) {
      commit('RECEIVE_USER_INFO', {userInfo})
    },
    // 异步获取用户信息
    async getUserInfo({commit}) {
      const result = await reqUserInfoBySession()
      if(result.code === 0) {
        const userInfo = result.data
        commit('RECEIVE_USER_INFO',{userInfo})
      }
    },
    async logout({commit}) {
      const result = await reqLogout()
      if(result.code === 0) {
        commit('RESET_USER_INFO')
      }
    }
  },
  mutations: {
    RECEIVE_USER_INFO(state, {userInfo}) {
      state.userInfo = userInfo
    },
    // 重置用户信息
    RESET_USER_INFO(state) {
      state.userInfo = {}
    }
  },
  getters: {

  }
}
