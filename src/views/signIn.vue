<template>
  <section class="sing-in">
    <header class="logo">
      <img src="../assets/images/default.png" />
      <span>用户注册</span>
    </header>
    <form @submit.prevent="singIn">
      <div class="username">
        <input type="del" maxlength='11' minlength="6" placeholder="用户名" v-model="username" />
      </div>
      <div class="pwd">
        <input type="password" maxlength='14' minlength="6" placeholder="密码" v-model="password" />
      </div>
      <div class="phone">
        <input type="tel" maxlength="11" placeholder="手机号码" v-model="phone" />
        <button type="button" :disabled="isDisabled || sendCode" class="get-code" @click="getCode">{{!sendCode ? '获取验证码' : `已发送(${computeTime}s)`}}</button>
      </div>
      <div class="code">
        <input type="tel" maxlength='6' placeholder="验证码" v-model="code" />
      </div>
      <div class="submit">
        <button type="submit">提交</button>
        <button type="reset">重置</button>
      </div>
    </form>
    <span class="goback" @click="$router.back()">
      <i class="iconfont icon-left"></i>
    </span>
  </section>
</template>

<script>
/*
  用户注册页面
  需求:
    1. 输入验证....
    2. 验证码(已完成,虽然把验证码给前端不安全,但是也不是正式项目就算了)
*/
import { reactive, toRefs, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { sendPhoneCode, clearInter } from '@js'
import { signInVerify } from '@utils/login'
export default {
  name: 'signin',
  setup () {
    const store = useStore()
    const { replace } = useRouter()
    const state = reactive({
      username: '',
      password: '',
      code: ''
    })
    const phoneState = sendPhoneCode()

    const singIn = async () => {
      const { username, password, code } = state
      const phone = phoneState.phone.value
      try {
        await signInVerify({ username, password, phone, code })
        store.dispatch('login', {
          params: { username, password, phone },
          type: 'signIn',
          callback: () => replace('/')
        })
      } catch (err) {
        console.log(err)
      }
    }
    // 组件销毁前关闭定时器,防止用户点击发送验证码后跑别的页面去
    onBeforeUnmount(clearInter)

    return { ...phoneState, singIn, ...toRefs(state) }
  }
}
</script>

<style lang="scss" scoped>
.sing-in{
  min-height: 100vh;
  background-color: $bg-color2;
  .logo{
    height: rem(100);
    background-image: url('~@img/user_bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    @extend .flex;
    flex-direction: column;
    img{
      width: rem(50);
      height: rem(50);
      border-radius: rem(50);
      margin-bottom: rem(10);
      border: rem(4) solid rgba($color: $bg-color2, $alpha: .2);
    }
    span{
      font-size: $base-size;
      color: $color;
      font-weight: 600;
    }
  }
  form{
    padding: rem(30) rem(10);
    input,
    button{
      border: none;
      background: none;
    }
    div{
      margin: rem(15) 0;
      display: flex;
      height: rem(40);
      &.phone button{
        width: rem(100);
        background-color: $theme;
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
        padding-left: rem(10);
        border-bottom: rem(1) solid $theme;
      }
      &.submit{
        margin-top: rem(30);
        justify-content: center;
        button{
          width: 30%;
          border-radius: rem(5);
          color: $color;
          font-size: $base-size;
          &[type='submit']{
            background-color: $theme;
            margin-right: rem(20);
          }
          &[type='reset']{
            background-color: $bg-color;
          }
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
