export default {
  namespaced: true, // 开启命名空间
  state: {
    userInfo: {}  // 用户信息
  },
  actions: {
    getUserInfo({commit}, userInfo) {
      commit('RECEIVE_USER_INFO', {userInfo})
    }
  },
  mutations: {
    RECEIVE_USER_INFO(state, {userInfo}) {
      state.userInfo = userInfo
    }
  },
  getters: {

  }
}
