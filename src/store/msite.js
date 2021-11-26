// 引入接口请求函数
import {reqAddress, reqFoodCategoryList, reqShopList} from 'api'
export default {
  namespaced: true, // 开启命名空间
  state: {
    latitude: 30.499082,  //  纬度
    longitude: 104.074041,  //  经度
    address: {},  //地址信息对象
    foodCategory: [],  // 食品分类数组
    shops: []   // 商家分类数组
  },
  actions: {
    // 获取地址信息
    async getAddress({commit, state}) {
      const geohash = state.latitude + ',' + state.longitude
      // 发送异步ajax请求
      const result = await reqAddress(geohash)
      // 提交一个mutations
      if (result.code === 0) {
        const address = result.data
        commit('RECEIVE_ADDRESS', {address})
      } else {
        console.log(result.message)
      }
    },

    // 获取食物分类列表
    async getCategory({commit}) {
      // 发送异步ajax请求
      const result = await reqFoodCategoryList()
      // 提交一个mutations
      if (result.code === 0) {
        const foodCategory = result.data
        commit('RECEIVE_CATEGORY', {foodCategory})
      } else {
        console.log(result.message)
      }
    },

    // 获取商家列表
    async getShops({commit,state}) {
      // 发送异步ajax请求
      const {latitude, longitude} = state
      const result = await reqShopList({latitude, longitude})
      // 提交一个mutations
      if (result.code === 0) {
        const shops = result.data
        commit('RECEIVE_SHOPS', {shops})
      } else {
        console.log(result.message)
      }
    }
  },
  mutations: {
    RECEIVE_ADDRESS(state, {address}) {
      state.address = address
    },
    RECEIVE_CATEGORY(state, {foodCategory}) {
      state.foodCategory = foodCategory
    },
    RECEIVE_SHOPS(state, {shops}) {
      state.shops = shops
    }
  },
  getters: {

  }
}
