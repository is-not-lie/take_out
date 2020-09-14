<template>
  <section class="profile" v-if="user.username">
    <header class="user">
      <img :src="`${BASE_URL}/images/${user.avatar_url}`" />
      <span>{{user.username}}</span>
    </header>
    <ul class="profile-content">
      <li v-for="(menu,i) in proMenu" :key="i">
        <router-link to="">
          <span><i class="iconfont" :class="menu.icon"></i>{{menu.name}}</span>
          <span class="iconfont icon-right"></span>
        </router-link>
      </li>
    </ul>
  </section>
  <div class="to-login" v-else>
    <img src="@img/error.png" />
    <p>您还未登录,无法获取个人信息...</p>
    <router-link :to="{ name: 'login' }">
      前往登录
    </router-link>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { proMenu } from '@data'
import { BASE_URL } from '@config'
export default {
  name: 'profile',
  setup () {
    const store = useStore()
    const state = reactive({
      user: store.state.user
    })
    return { proMenu, BASE_URL, ...toRefs(state) }
  }
}
</script>

<style lang="scss" scoped>
.profile{
  min-height: 100vh;
  margin-bottom: rem(50);
  background-color: $bg-color3;
  .user{
    @extend .flex;
    flex-direction: column;
    background-image: url('~@img/user_bg.png');
    padding-top: rem(40);
    padding-bottom: rem(20);
    img{
      width: rem(80);
      height: rem(80);
      border-radius: rem(80);
      border: rem(4) solid rgba($color: #fff, $alpha: 0.2);
      margin-bottom: rem(10);
    }
  }
  .profile-content{
    li{
      &:not(:nth-last-child(1)){
        border-bottom: 1px solid $border-color;
      }
      a{
        @extend .flex;
        justify-content: space-between;
        padding: rem(15) rem(20);
        background-color: $bg-color2;
        i{
          margin-right: rem(10);
          color: $color2;
        }
      }
    }
  }
}
.to-login{
  @extend .flex;
  flex-direction: column;
  padding: rem(50);
  a{
    width: rem(120);
    height: rem(40);
    text-align: center;
    line-height: rem(40);
    background-color: $theme;
    color: $color2;
    font-weight: 600;
    margin: rem(20) 0;
    border-radius: rem(5);
  }
  p{
    margin: rem(20) 0;
  }
}
</style>
