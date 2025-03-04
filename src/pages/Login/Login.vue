<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">DT外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: isLoginBySMS}" @click="isLoginBySMS = true">短信登录</a>
          <a href="javascript:;" :class="{on: !isLoginBySMS}" @click="isLoginBySMS = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on: isLoginBySMS}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model.number="phone">
              <button :disabled="!rightPhone" class="get_verification" :class="{right_phone: rightPhone}" @click.prevent="getCode">
                {{Countdown ? `已发送(${Countdown})s` : '获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="6" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !isLoginBySMS}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-if="!showPwd">
                <input type="text" maxlength="8" placeholder="密码" v-model="pwd" v-else>
                <div class="switch_button" :class="showPwd ? 'on' : 'off'" @click="showPwd = !showPwd">
                  <div class="switch_circle" :class="{right: showPwd}"></div>
                  <span class="switch_text">{{ showPwd ? 'abc' : '...' }}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" ref="captcha" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="goBack">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"></AlertTip>
  </div>
</template>

<script>
import { reqSMSVerificationCode, reqLoginByPhoneVerificationCode, reqLoginByUsername } from 'api'
import AlertTip from "components/AlertTip/AlertTip"
export default {
  name: "Login",
  components: {
    AlertTip
  },
  data() {
    return {
      Countdown: 0, // 倒计时的时间
      isLoginBySMS: true, // 通过该标识，动态显示登录方式，默认是短信登录
      showPwd: false, // 默认不显示密码
      phone: '',  // 手机号
      code: '', // 短信验证码
      name: '', // 用户名
      pwd: '',  // 密码
      captcha: '',  // 一次性图片验证码
      alertText: '', // 提示文本
      alertShow: false  // AlerTip组件显示或隐藏
    }
  },
  computed: {
    // 用来判断手机号是否合法
    rightPhone() {
      return /^1\d{10}/.test(this.phone)
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    // 异步获取短信验证码
    async getCode() {
      // 如果当前没有计时，则开启循环定时器
      if(!this.Countdown) {
        // 启动倒计时
        this.Countdown = 30
        // 启动循环定时器
        this.ctInterId = setInterval(() => {
          // 每隔1s减1
          this.Countdown--
          // 如果倒计时为0,关闭循环定时器
          if(this.Countdown <= 0) {
            this.Countdown = 0
            clearInterval(this.ctInterId)
          }
        },1000)
        // 发送ajax请求登录
        const result = await reqSMSVerificationCode(this.phone)
        // 如果短信验证码发送失败
        if (result.code === 1) {
          // 显示错误信息
          this.showAlert(result.msg)
          // 关闭定时器
          if(this.Countdown) {
            this.Countdown = 0
            clearInterval(this.ctInterId)
          }
        }
        }
      },
    // 用来显示AlertTip组件
    showAlert(alertText) {
      this.alertShow = true
      this.alertText = alertText
    },
    // 异步登录
    async login() {
      let result
      // 判断登录方式
      if(this.isLoginBySMS) {
        // 短信验证码登录
        const {rightPhone, phone, code} = this
        if(!rightPhone) {
          this.showAlert('手机号不对，必须以数字1开头，长度为11位的数字')
          return
        } else if(!/^\d{6}$/.test(code)) {
          this.showAlert('验证码必须为6位的数字')
          return
        } else {
          result = await reqLoginByPhoneVerificationCode(phone, code)
        }
      } else {
        const {name, pwd, captcha} = this
        if(!name) {
          this.showAlert('用户名不能为空')
          return
        } else if(!pwd) {
          this.showAlert('密码不能为空')
          return
        } else if(!captcha) {
          this.showAlert('图片验证码不能为空')
          return
        } else {
          result = await reqLoginByUsername(name, pwd, captcha)
        }
      }

      // 关闭定时器
      if(this.Countdown) {
        this.Countdown = 0
        clearInterval(this.ctInterId)
      }


      // 根据结果处理数据
      if(result.code === 0) {
        const user = result.data
        // 将user保存到vuex中profile的state中
        this.$store.dispatch('profile/recordUserInfo',user)
        // 跳转路由，去个人中心界面
        this.$router.replace('/profile')
      } else {
        const msg = result.msg
        // 提示错误信息
        this.showAlert(msg)
        // 重新发一次请求，获取新的图片验证码
        this.getCaptcha()
      }
    },
    // 禁止AlertTip组件的显示
    closeTip() {
      this.alertShow = false
      this.alertText = ''
    },
    // 获取一次性图片验证码
    getCaptcha() {
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()  // 保证每次发请求的src不一样
    }
  },
  mounted() {
    this.getCaptcha()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
              .right_phone
                color #333
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
