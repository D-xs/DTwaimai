<template>
  <div id="app">
    <router-view></router-view>
    <footer-guide></footer-guide>
  </div>
</template>

<script>
import FooterGuide from "components/FooterGuide/FooterGuide";
export default {
  name: 'App',
  components: {
    FooterGuide
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
