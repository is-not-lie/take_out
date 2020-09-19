<template>
  <section class="shop-info" v-if="shopGoods">
    <header v-if="shopGoods.shopInfo">
      <div class="goback" @click="push('/')">
        <i class="iconfont icon-left"></i>
      </div>
      <div class="merchant">
        <img :src="shopGoods.shopInfo.shopPic" :alt="shopGoods.shopInfo.shopName">
        <div class="merchant-info">
          <p class="journey">
            <span class="distance" v-html="`${shopGoods.shopInfo.deliveryTimeDecoded}分钟`"></span>
            <span class="time" v-html="shopGoods.shopInfo.distance"></span>
          </p>
          <p class="affiche">公告:{{shopGoods.shopInfo.bulletin}}</p>
        </div>
      </div>
    </header>
    <img src="@img/msite_back.svg" v-else/>
    <section v-if="shopGoods.categoryList">
      <ul class="menu">
        <li :class="{active: showModel === 0}" @touchstart="showModel = 0"><span>点菜</span></li>
        <li :class="{active: showModel === 1}" @touchstart="showModel = 1"><span>评价</span></li>
        <li :class="{active: showModel === 2}" @touchstart="showModel = 2"><span>商家</span></li>
      </ul>
      <Goods :list="shopGoods.categoryList" v-if="showModel === 0"/>
      <Comments v-if="showModel === 1"/>
      <Shop v-if="showModel === 2"/>
    </section>
    <img src="@img/shop_back.svg" v-else/>
    <footer v-if="shopGoods.shopInfo">
      <div class="cart">
        <i class="iconfont icon-cart"></i>
      </div>
      <span>另需配送费¥{{shopGoods.shopInfo.deliveryFee}}</span>
      <span class="minFee">¥{{shopGoods.shopInfo.minFee}}起送</span>
      <router-link to="" v-show="false">去结算</router-link>
    </footer>
  </section>
  <section v-else>
    <img src="@img/error.png"/>
    <h3>暂无该商家信息...</h3>
  </section>
</template>

<script>
import { onBeforeMount, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { Goods, Shop, Comments } from '@com/shopInfo'
export default {
  name: 'shopinfo',
  components: { Goods, Shop, Comments },
  setup () {
    const store = useStore()
    const { params } = useRoute()
    const { push } = useRouter()
    const state = reactive({
      shopGoods: store.state.shopGoods,
      showModel: 0
    })

    onBeforeMount(() => {
      if (store.state.shopGoods) {
        store.dispatch('getShopGoods', {
          shopId: params.id,
          callback (shopGoods) { state.shopGoods = shopGoods }
        })
      }
    })
    return { push, ...toRefs(state) }
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
      padding-left: rem(10);
      color: #fff;
      img{
        float: left;
        width: rem(85);
        height: rem(64);
        margin-top: rem(5);
        margin-right: rem(10);
        box-shadow: 0 rem(2) rem(15) 0 rgba(0, 0, 0, 0.15);
        border-radius: rem(2);
      }
      .merchant-info{
        padding-top: rem(20);
        font-size: $min-size;
        .affiche{
          @extend .nowrap;
          padding-top: rem(10);
        }
      }
    }
  }
  section{
    position: sticky;
    top: rem(80);
    left: 0;
    .menu{
      display: flex;
      padding-top: rem(20);
      li{
        flex: 1;
        height: rem(40);
        position: relative;
        text-align: center;
        line-height: rem(40);
        color: $color2;
        font-size: $base-size;
        &.active{
          color: $color;
          &::after{
            content: '';
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translateX(-50%);
            width: rem(20);
            height: rem(2);
            background-color: $theme;
          }
        }
      }
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
    color: $color2;
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
    .minFee{
      padding: 0 rem(18);
      font-size: $base-size;
      font-weight: 600;
    }
  }
}
</style>
