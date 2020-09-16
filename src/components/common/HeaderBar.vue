<template>
  <header class="header-bar">
    <i class="iconfont icon-position" @touchstart="push({name: 'position', params: { id: 1 }})"></i>
    <span class="site" @touchstart="push({name: 'position', params: { id: 1 }})">{{'广东省潮州市枫溪区'}}</span>
    <i class="iconfont icon-seach" @touchstart="push({name: 'seach'})"></i>
  </header>
</template>

<script>
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
