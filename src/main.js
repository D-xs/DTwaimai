import Vue from 'vue'
import App from './App.vue'

// 引入路由器对象
import router from './router'
// 引入store对象
import store from './store'
// 引入mint-ui
import { Button } from 'mint-ui'
Vue.config.productionTip = false
// 注册全局组件标签
Vue.component(Button.name, Button)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
