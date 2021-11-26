<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-if="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import FooterGuide from "components/FooterGuide/FooterGuide"
export default {
  name: 'App',
  components: {
    FooterGuide
  },
  mounted() {
    // 获取后台数据，存放到msite的state中
    this.getAddress()
    this.getCategory()
    this.getShops()
  },
  methods: {
    ...mapActions('msite', ['getAddress', 'getCategory', 'getShops'])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "assets/css/reset.css"  // 引入重置样式表
  #app
    width 100%
    height 100%
    background #f5f5f5
</style>
