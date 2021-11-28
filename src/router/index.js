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
const Shop = () => import('pages/Shop/Shop')
const ShopGoods = () => import('pages/Shop/ShopGoods/ShopGoods')
const ShopRatings = () => import('pages/Shop/ShopRatings/ShopRatings')
const ShopInfo = () => import('pages/Shop/ShopInfo/ShopInfo')
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
  },
  {
    path: '/shop',
    component: Shop,
    children: [
      {
        path: 'goods',
        component: ShopGoods
      },
      {
        path: 'ratings',
        component: ShopRatings
      },
      {
        path: 'info',
        component: ShopInfo
      },
      {
        path: '',
        redirect: 'goods'
      }
    ]
  }
]
// 创建路由器对象并暴露出去
export default new VueRouter({
  routes,
  // 使用history模式
  mode: 'history'
})



