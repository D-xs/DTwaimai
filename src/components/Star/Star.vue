<template>
  <div class="star" :class="`star-${size}`">
    <span class="star-item" v-for="(starClass, index) in starClassesArr" :key="index" :class="starClass"></span>
  </div>
</template>

<script>
// 定义类名常量
const CLASS_ON = 'on'
const CLASS_HALF = 'half'
const CLASS_OFF = 'off'

export default {
  name: "Star",
  props: {
    score: Number,
    size: Number
  },
  computed: {
    starClassesArr() {
      const {score} = this
      const scs = []

      // 根据整数来添加on
      for(let i = 0; i < Math.floor(score); i++) {
        scs.push(CLASS_ON)
      }

      // 如果小数部分 >= 0.5 则添加一个half
      if(Math.round(score) > score) {
        scs.push(CLASS_HALF)
      }

      // 剩下的来塞入off
      while (scs.length < 5) {
        scs.push(CLASS_OFF)
      }

      return scs
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star48_on')
        &.half
          bg-image('./images/star48_half')
        &.off
          bg-image('./images/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star36_on')
        &.half
          bg-image('./images/star36_half')
        &.off
          bg-image('./images/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star24_on')
        &.half
          bg-image('./images/star24_half')
        &.off
          bg-image('./images/star24_off')
</style>
