<template>
  <div class="footer_guide">
    <span href="javascript:;" class="guide_item" :class="{on: isCurrent('/msite')}" @click="goto('/msite')">
      <span class="item_icon">
        <i class="iconfont icon-16gl-D"></i>
      </span>
      <span>外卖</span>
    </span>
    <span href="javascript:;" class="guide_item" :class="{on: isCurrent('/search')}" @click="goto('/search')">
      <span class="item_icon">
        <i class="iconfont icon-search"></i>
      </span>
      <span>搜索</span>
    </span>
    <span href="javascript:;" class="guide_item" :class="{on: isCurrent('/order')}" @click="goto('/order')">
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>订单</span>
    </span>
    <span href="javascript:;" class="guide_item" :class="{on: isCurrent('/profile')}" @click="goto('/profile')">
      <span class="item_icon">
        <i class="iconfont icon-geren"></i>
      </span>
      <span>我的</span>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'FooterGuide',
    methods: {
      // 通过编程式路由导航实现路由跳转
      goto(path) {
        // 使用替换模式
        this.$router.replace(path)
      },
      // 动态绑定class属性 on
      isCurrent(path) {
        return this.$route.path === path
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixins.styl"
  .footer_guide  //footer
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999
      &.on
        color #02a774
      span
        font-size 12px
        margin-top 2px
        margin-bottom 2px
        .iconfont
          font-size 22px
</style>
