import Vue from 'vue'
import App from './App.vue'

// 引入路由器对象
import router from './router'
// 引入store对象
import store from './store'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
