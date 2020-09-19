<template>
  <div class="home">
    <HeaderBar />
    <CategoryMenu />
    <h3 class="title">附近商家</h3>
    <HomeMain />
  </div>
</template>

<script>
import { CategoryMenu, HomeMain } from '@com/home'
export default {
  name: 'home',
  components: { CategoryMenu, HomeMain },
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.title{
  @extend .flex;
  margin-top: rem(20);
  margin-bottom: rem(5);
  &::before{
    @extend .min-line;
    transform-origin: 100% 50%;
  }
  &::after{
    @extend .min-line;
    transform-origin: 0 50%;
  }
}
</style>
