// 引入Vue
import Vue from "vue"
// 引入Vue-Router插件
import VueRouter from "vue-router"
// 应用插件
Vue.use(VueRouter);

// 引入相应的路由组件，使用路由懒加载模式
const Msite = () => import('pages/Msite/Msite')
const Search = () => import('pages/Search/Search')
const Order = () => import('pages/Order/Order')
const Profile = () => import('pages/Profile/Profile')
const Login = () => import('pages/Login/Login')
// 创建路由
const routes = [
  {
    path: '/',
    redirect: '/msite'
  },
  {
    path: '/msite',
    component: Msite,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/login',
    component: Login
  }
]
// 创建路由器对象并暴露出去
export default new VueRouter({
  routes,
  // 使用history模式
  mode: 'history'
})



