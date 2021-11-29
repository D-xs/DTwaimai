// 引入接口请求函数

import {reqShopGoods, reqShopInfo, reqShopRatings} from "api"
export default {
  namespaced: true, // 开启命名空间
  state: {
    goods: [],  // 商家商品数组
    ratings: [],  // 商家评价数组
    info: {}     // 商家信息
  },
  actions: {
    // 获取商家信息
    async getShopInfo({commit}) {
      // 发送异步ajax请求
      const result = await reqShopInfo()
      // 提交一个mutations
      if (result.code === 0) {
        const info = result.data
        commit('RECEIVE_SHOP_INFO', {info})
      } else {
        console.log(result.message)
      }
    },
    // 获取商家商品信息
    async getShopGoods({commit}, callback) {
      // 发送异步ajax请求
      const result = await reqShopGoods()
      // 提交一个mutations
      if (result.code === 0) {
        const goods = result.data
        commit('RECEIVE_SHOP_GOODS', {goods})
        callback && callback()
      } else {
        console.log(result.message)
      }
    },
    // 获取商家商品评价
    async getShopRatings({commit}) {
      // 发送异步ajax请求
      const result = await reqShopRatings()
      // 提交一个mutations
      if (result.code === 0) {
        const ratings = result.data
        commit('RECEIVE_SHOP_RATINGS', {ratings})
      } else {
        console.log(result.message)
      }
    },
  },
  mutations: {
    RECEIVE_SHOP_INFO(state, {info}) {
      state.info = info
    },
    RECEIVE_SHOP_GOODS(state, {goods}) {
      state.goods = goods
    },
    RECEIVE_SHOP_RATINGS(state, {ratings}) {
      state.ratings = ratings
    }
  },
  getters: {

  }
}
