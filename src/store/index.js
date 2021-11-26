// Vuex核心代码
// 引入Vue
import Vue from "vue"
// 引入Vuex
import Vuex from 'vuex'
// 应用Vuex插件
Vue.use(Vuex)
// 引入主页状态模块
import msite from "./msite";
// 创建并暴露store对象
export default new Vuex.Store({
  modules: {
    msite
  }
})
