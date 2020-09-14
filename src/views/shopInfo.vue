<template>
  <section class="shop-info">
    <header>
      <div class="goback">
        <i class="iconfont icon-left"></i>
      </div>
      <div class="merchant">
        <img src="" alt="">
        <div class="merchant-info"></div>
      </div>
    </header>
    <section></section>
    <footer>
      <div class="cart">
        <i class="iconfont icon-cart"></i>
      </div>
      <span>另需配送费{{'$9.9'}}</span>
      <span>{{'$19'}}起送</span>
      <router-link to="" v-show="false">去结算</router-link>
    </footer>
  </section>
</template>

<script>
export default {
  name: 'shopinfo',
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.shop-info{
  header{
    background-color: $bg-color4;
    .goback{
      height: rem(50);
      @extend .border-bottom;
      display: flex;
      i{
        width: rem(50);
        text-align: center;
        line-height: rem(50);
        font-size: $max-size;
        color: #fff;
      }
    }
    .merchant{
      height: rem(80);
      @extend .flex;
    }
  }
  footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: rem(50);
    background-color: $bg-color5;
    padding-left: rem(70);
    @extend .flex;
    justify-content: space-between;
    .cart{
      position: absolute;
      left: rem(10);
      bottom: rem(10);
      width: rem(50);
      height: rem(50);
      text-align: center;
      line-height: rem(50);
      background-color: $color;
      border-radius: rem(50);
      i{
        font-size: $max-size;
        color: $color4;
      }
    }
  }
}
</style>
