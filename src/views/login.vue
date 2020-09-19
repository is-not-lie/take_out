<template>
  <section class="login">
    <header class="logo">
      <img src="../assets/images/login_logo.png" />
      <span>美团外卖</span>
    </header>
    <section>
      <div class="btn-tab">
        <button :class="{on:isPhoneLogin}" @touchstart="isPhoneLogin = true">短信登录</button>
        <button :class="{on:!isPhoneLogin}" @touchstart="isPhoneLogin = false">密码登录</button>
      </div>
      <form @submit.prevent="Login">
        <div class="login-phone" v-show="isPhoneLogin">
          <div class="phone">
            <input type="tel" maxlength="11" placeholder="手机号码" v-model="phoneLogin.phone" />
            <button type="button" :disabled="phoneLogin.isDisabled || sendCode" class="get-code" @click="getCode">{{!sendCode ? '获取验证码' : `已发送(${computeTime}s)`}}</button>
          </div>
          <div class="code">
            <input type="tel" maxlength='6' placeholder="验证码" v-model="phoneLogin.code" />
          </div>
        </div>
        <div class="login-pwd" v-show="!isPhoneLogin">
          <div class="name">
            <input type="del" maxlength='11' minlength="6" placeholder="手机号/用户名" v-model="pwdLogin.username" />
          </div>
          <div class="pwd">
            <input type="password" maxlength='14' minlength="6" placeholder="密码" v-model="pwdLogin.password" />
          </div>
          <div class="captcha">
            <input type="tel" placeholder="验证码" maxlength='4' v-model="pwdLogin.captcha" />
            <span v-html="svg" @click="getCaptcha"></span>
          </div>
        </div>
        <div class="submit">
          <button type="submit" class="sub-btn">登录</button>
          <router-link :to="{ name: 'signin' }">注册</router-link>
        </div>
      </form>
    </section>
    <span class="goback" @click="$router.back()">
      <i class="iconfont icon-left"></i>
    </span>
  </section>
</template>

<script>
import { reactive, toRefs, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { http } from '@api'
export default {
  setup () {
    const { dispatch } = useStore()
    const { replace } = useRouter()
    const state = reactive({
      isPhoneLogin: true,
      phoneLogin: {
        phone: '',
        code: '',
        isDisabled: computed(() => !/^1\d{10}$/.test(state.phoneLogin.phone))
      },
      pwdLogin: {
        username: '',
        password: '',
        captcha: ''
      },
      sendCode: false,
      computeTime: 60,
      captcha: '',
      svg: '',
      CAPTCHA: ''
    })

    const Login = () => {
      const { isPhoneLogin } = state
      if (isPhoneLogin) {
        const { phone, code, isDisabled } = state.phoneLogin
        if (code !== state.CAPTCHA) {
          console.log('验证码输入错误')
        } else if (isDisabled) {
          console.log('手机号格式错误')
        } else {
          dispatch('login', {
            params: { phone },
            type: 'login',
            callback: () => replace('/')
          })
        }
      } else {
        const { username, password, captcha } = state.pwdLogin
        if (captcha.toLowerCase() !== state.captcha) {
          console.log('验证码输入错误')
          getCaptcha()
        } else if (username.trim() === '' || username.length < 6) {
          console.log('用户名格式错误')
        } else if (password.trim() === '' || password.length < 6) {
          console.log('密码格式错误')
        } else {
          dispatch('login', {
            params: { username, password },
            type: 'login',
            callback: () => replace('/')
          })
        }
      }
    }
    // 获取svg验证码
    const getCaptcha = async () => {
      const svg = await http.reqCaptcha()
      if (svg) {
        state.captcha = svg.text.toLowerCase()
        state.svg = svg.data
      }
    }
    // 发送短信验证码
    const getCode = async () => {
      const { isDisabled, phone } = state.phoneLogin
      if (isDisabled) {
        console.log('手机号格式错误')
      } else {
        state.sendCode = true
        const CAPTCHA = await http.reqSendCode(phone)
        const intervalKey = setInterval(() => {
          state.computeTime--
          if (CAPTCHA || state.computeTime <= 0) {
            clearInterval(intervalKey)
            state.sendCode = false
            state.computeTime = 60
            state.CAPTCHA = CAPTCHA || ''
          }
        }, 1000)
      }
    }

    onMounted(getCaptcha)

    return {
      Login,
      getCaptcha,
      getCode,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  min-height: 100vh;
  background-color: $bg-color2;
  .logo{
    height: rem(100);
    margin-bottom: rem(50);
    @extend .flex;
    flex-direction: column;
    img{
      width: rem(50);
      height: rem(50);
      margin-bottom: rem(10);
    }
    span{
      font-size: $base-size;
      color: $color;
      font-weight: 600;
    }
  }
  section{
    .btn-tab{
      text-align: center;
      margin-bottom: rem(20);
      button{
        margin: 0 rem(10);
        height: rem(40);
        width: 30%;
        border: none;
        background: none;
        color: $color2;
        font-size: $base-size;
        border-radius: rem(5);
        box-shadow: -3px -3px 4px rgba(250, 250, 250, 1),
          3px 3px 4px rgba(0, 0, 0, 0.2);
        &.on{
          box-shadow: inset -3px -3px 4px rgba(250, 250, 250, 1),
            inset 3px 3px 4px rgba(0, 0, 0, 0.2);
          color: $theme;
        }
      }
    }
    form{
      .login-phone,
      .login-pwd{
        padding: rem(20) rem(10);
        display: flex;
        flex-direction: column;
        div{
          flex: 1;
          display: flex;
          margin: rem(10) 0;
          border-radius: rem(5);
          button{
            width: rem(100);
            background-color: $theme;
            border: none;
            border-top-left-radius: rem(5);
            border-top-right-radius: rem(5);
            color: $color;
            &:disabled{
              background-color: $bg-color3;
              color: $color2;
            }
          }
          input{
            flex: 1;
            border: none;
            height: rem(40);
            padding-left: rem(10);
            border-bottom: 1px solid $theme;
            &::placeholder{
              color: $color2;
            }
          }
        }
      }
      .submit{
        @extend .flex;
        flex-direction: column;
        button{
          width: 50%;
          height: rem(30);
          border: 1px solid $theme;
          background-color: $theme;
          color: $color;
          font-size: $base-size;
          font-weight: 600;
          border-radius: rem(5);
        }
        a{
          margin-top: rem(20);
          padding: 0 rem(30) rem(10);
          border-bottom: 1px solid $theme;
        }
      }
    }
  }
  .goback{
    position: fixed;
    top: 0;
    left: 0;
    width: rem(40);
    height: rem(40);
    text-align: center;
    line-height: rem(40);
    color: $color;
    font-weight: 600;
    font-size: $base-size;
  }
}
</style>
