<template>
  <section class="login">
    <header class="logo">
      <img src="@img/login_logo.png" />
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
            <input type="tel" maxlength="11" placeholder="手机号码" v-model="phone" />
            <button type="button" :disabled="isDisabled || sendCode" class="get-code" @click="getCode">{{!sendCode ? '获取验证码' : `已发送(${computeTime}s)`}}</button>
          </div>
          <div class="code">
            <input type="tel" placeholder="验证码" v-model="code" />
          </div>
        </div>
        <div class="login-pwd" v-show="!isPhoneLogin">
          <div class="name">
            <input type="del" placeholder="手机号/用户名" v-model="pwdLogin.username" />
          </div>
          <div class="pwd">
            <input type="password" placeholder="密码" v-model="pwdLogin.password" />
          </div>
          <div class="captcha">
            <input type="tel" placeholder="验证码" v-model="pwdLogin.captcha" />
            <span v-html="svg" @click="getCaptcha"></span>
          </div>
        </div>
        <div class="submit">
          <button type="submit" class="sub-btn">登录</button>
          <router-link :to="{ name: 'signin' }">注册</router-link>
        </div>
      </form>
    </section>
    <span class="goback" @click="back()">
      <i class="iconfont icon-left"></i>
    </span>
  </section>
</template>

<script>
/*
  用户登录页面
  需求: 功能基本写完了, 就剩下输入验证和优化
*/
import { reactive, toRefs, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { sendPhoneCode, clearInter } from '@js'
import { captcha, loginVerify } from '@utils/login'
export default {
  setup () {
    const { dispatch } = useStore()
    const { replace, back } = useRouter()
    const state = reactive({
      isPhoneLogin: true,
      code: '',
      pwdLogin: {
        username: '',
        password: '',
        captcha: ''
      },
      svg: ''
    })
    const phoneState = sendPhoneCode()
    // 获取svg验证码
    const getCaptcha = captcha(300, (svg) => { state.svg = svg })

    const Login = async () => {
      const { isPhoneLogin, code } = state
      const phone = phoneState.phone?.value
      const { username, password, captcha } = state.pwdLogin
      try {
        if (isPhoneLogin) {
          await loginVerify({ phone, code })
          dispatch('login', {
            params: { phone },
            type: 'login',
            callback: () => replace('/')
          })
        } else {
          await loginVerify({ username, password, captcha })
          dispatch('login', {
            params: { username, password },
            type: 'login',
            callback: () => replace('/')
          })
        }
      } catch (err) {
        console.log(err)
        if (!isPhoneLogin) getCaptcha()
      }
    }

    onMounted(getCaptcha)
    // 组件销毁前关闭定时器,防止用户点击发送验证码后跑别的页面去
    onBeforeUnmount(clearInter)

    return { Login, getCaptcha, ...phoneState, ...toRefs(state), back }
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
        box-shadow: rem(-3) rem(-3) rem(4) $bg-color2,
          rem(3) rem(3) rem(4) $shadow-color;
        &.on{
          box-shadow: inset rem(-3) rem(-3) rem(4) $bg-color2,
            inset rem(3) rem(3) rem(4) $shadow-color;
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
            border-bottom: rem(1) solid $theme;
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
          border: rem(1) solid $theme;
          background-color: $theme;
          color: $color;
          font-size: $base-size;
          font-weight: 600;
          border-radius: rem(5);
        }
        a{
          margin-top: rem(20);
          padding: 0 rem(30) rem(10);
          border-bottom: rem(1) solid $theme;
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
