<template>
  <nav class="footer-bar">
    <ul>
      <li v-for="nav in footerBar" :key="nav.path">
        <router-link :to="{ name: nav.path }">
          <i class="iconfont" :class="nav.icon"></i>
          <span>{{nav.name}}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
// 底部导航条组件,已完成
import { useRouter } from 'vue-router'
import { footerBar } from '@data'
export default {
  name: 'FooterBar',
  setup (props, ctx) {
    const { push } = useRouter()
    return { footerBar, push }
  }
}
</script>

<style lang="scss" scoped>
.footer-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  background-color: $bot-bg-color;
  ul {
    @extend .flex;
    li {
      flex: 1;
      a{
        @extend .flex;
        flex-direction: column;
        height: rem(50);
        color: $link-color;
        i {
          font-size: $max-size;
        }
        span {
          font-size: $min-size;
          margin-top: rem(3);
        }
        &.router-link-active{
          color: $link-active-color;
          i{
            color: $theme;
          }
        }
      }
    }
  }
}
</style>
