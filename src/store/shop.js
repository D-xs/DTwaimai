// 引入Vue
import Vue from "vue";
// 引入接口请求函数
import {reqShopGoods, reqShopInfo, reqShopRatings} from "api"
export default {
  namespaced: true, // 开启命名空间
  state: {
    goods: [],  // 商家商品数组
    ratings: [],  // 商家评价数组
    info: {},     // 商家信息
    cartFoods: [],   // 购物车中食物列表,count > 0
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
    async getShopRatings({commit}, callback) {
      // 发送异步ajax请求
      const result = await reqShopRatings()
      // 提交一个mutations
      if (result.code === 0) {
        const ratings = result.data
        commit('RECEIVE_SHOP_RATINGS', {ratings})
        callback && callback()
      } else {
        console.log(result.message)
      }
    },
    // 同步更新food中的count数量
    updateFoodCount({commit},{isAdd, food}) {
      if(isAdd) {
        commit('INCREMENT_FOOD_COUNT',{food})
      } else {
        commit('DECREMENT_FOOD_COUNT',{food})
      }
    },
    // 清空购物车
    clearCart({commit}) {
      commit('CLEAR_CART')
    }
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
    },
    INCREMENT_FOOD_COUNT(state,{food}) {
      if(!food.count) {
        Vue.set(food, 'count', 1)   // 让count属性对应的数据具有响应式
        state.cartFoods.push(food)  //将food添加到cartFoods中
      } else {
        food.count++
      }
    },
    DECREMENT_FOOD_COUNT(state,{food}) {
      if(food.count) {
        food.count--
        if(food.count === 0) {
          // 将food从cartFoods中移除
          state.cartFoods.forEach((value, index, array) => {
            if(value.name === food.name) {
              array.splice(index,1)
            }
          })
        }
      }
    },
    CLEAR_CART(state) {
      // 清除food中的count，count值应该为0
      state.cartFoods.forEach(food => {
        food.count = 0
      })
      // 移除cartFoods数组中的元素，移除所有购物项目
      state.cartFoods = []
    }
  },
  getters: {
    totalCount(state) {
      // 1.
      // let total = 0
      // state.cartFoods.forEach(food => {
      //   total += food.count
      // })
      // return total
      return state.cartFoods.reduce((preTotal, food) => preTotal + food.count, 0)
    },
    totalPrice(state) {
      // 1.
      // let total = 0
      // state.cartFoods.forEach(food => {
      //   total += food.count * food.price
      // })
      // return total
      return state.cartFoods.reduce((preTotal, food) => preTotal + food.count * food.price, 0)
    },
    // 统计满意评价的个数
    positiveSize(state) {
      return state.ratings.reduce((preTotal, rating) => preTotal + (rating.rateType === 0 ? 1 : 0), 0)
    }
  }
}
