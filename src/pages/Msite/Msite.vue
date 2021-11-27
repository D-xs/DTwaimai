<template>
  <div class="msite">
      <!--首页头部-->
    <HeaderTop :title="address.name">
        <span class="header_search" slot="left" @click="$router.push('/search')">
          <i class="iconfont icon-search"></i>
        </span>
        <router-link class="header_login" slot="right" :to="userInfo._id ? '/userinfo' : '/login'">
          <span class="header_login_text" v-if="!userInfo._id">
            登录|注册
          </span>
          <span class="header_login_text" v-else>
            <i class="iconfont icon-person"></i>
          </span>
        </router-link>
      </HeaderTop>
      <!--首页导航-->
    <nav class="msite_nav">
        <div class="swiper-container" v-if="foodCategoryArr.length">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(category, index) in foodCategoryArr" :key="index">
              <a href="javascript:" class="link_to_food" v-for="(categoryItem, index) in category" :key="index">
                <div class="food_container">
                  <img :src="baseImageUrl + categoryItem.image_url">
                </div>
                <span>{{categoryItem.title}}</span>
              </a>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
        <img src="./images/msite_back.svg" alt="back" v-else>
      </nav>
      <!--首页附近商家-->
    <div class="msite_shop_list">
        <div class="shop_header">
          <i class="iconfont icon-xuanxiang"></i>
          <span class="shop_header_title">附近商家</span>
        </div>
        <ShopList></ShopList>
      </div>
  </div>
</template>

<script>
// 引入swiper
import Swiper from 'swiper'
// 引入swiper的样式文件
import 'swiper/dist/css/swiper.min.css'
// 引入vuex提供的api
import {mapState, mapActions} from 'vuex'
import HeaderTop from "components/HeaderTop/HeaderTop"
import ShopList from "components/ShopList/ShopList"
export default {
  name: "Msite",
  components: {
    HeaderTop,
    ShopList
  },
  data() {
    return {
      baseImageUrl: 'https://fuss10.elemecdn.com'
    }
  },
  computed: {
    ...mapState('msite', ['address', 'foodCategory', 'shops']),
    ...mapState('profile',['userInfo']),
    // 根据foodCategory一维数组来生成二维数组，以此实现轮播图效果
    foodCategoryArr() {
      const { foodCategory } = this
      // 创建一个外层数组
      const arr = []
      // 创建一个内层数组
      let minArr = []
      // 循环遍历foodCategory
      foodCategory.forEach( c => {
        // 如果小数组满了，则清空
        if(minArr.length === 8) {
          minArr = []
        }
        // 如果小数组长度为0，添加到二维数组中
        if(minArr.length === 0) {
          arr.push(minArr)
        }
        // 将当前分类的小对象放到小数组中
        minArr.push(c)
      })
      return arr
    }
  },
  watch: {
    foodCategoryArr() {       // 数组中有数据了之后，在异步更新界面之前执行
      // 该生命周期钩子里的回调会在更新了界面之后立即执行
      this.$nextTick(() => {
        // 当被渲染真实Dom时，创建Swiper对象，来实现轮播
        new Swiper('.swiper-container', {
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          },
        })
      })
    }
  },
  methods: {
    ...mapActions('msite', ['getAddress', 'getCategory', 'getShops'])
  },
  mounted() {

    // 获取后台数据，存放到msite的state中
    this.getAddress()
    this.getCategory()
    this.getShops()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>
