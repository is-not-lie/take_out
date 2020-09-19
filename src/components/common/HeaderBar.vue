<template>
  <header class="header-bar">
    <i class="iconfont icon-position" @touchstart="push({name: 'position', params: { id: 1 }})"></i>
    <span class="site" @touchstart="push({name: 'position', params: { id: 1 }})">{{'广东省潮州市枫溪区'}}</span>
    <i class="iconfont icon-seach" @touchstart="push({name: 'seach'})"></i>
  </header>
</template>

<script>
/*
  顶部条组件
  需求:
    1. 加载后请求用户定位并显示
    2. 当滚动条位置位于商品列表时隐藏定位,显示搜索组件
    3. 点击跳转定位页面 || 搜索页面
*/
import { useRouter } from 'vue-router'
export default {
  name: 'HeaderBar',
  setup () {
    const { push } = useRouter()
    return { push }
  }
}
</script>

<style lang="scss" scoped>
.header-bar{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: rem(50);
  background-color: $top-bg-color;
  color: #fafafad7;
  @extend .flex;
  i{
    flex: 1;
    text-align: center;
    font-size: $base-size;
  }
  .site{
    flex: 3;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: $base-size;
  }
}
</style>
