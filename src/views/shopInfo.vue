<template>
  <section class="shop-info" v-if="shopGoods">
    <header v-if="shopGoods.shopInfo">
      <div class="goback" @click="push('/')">
        <i class="iconfont icon-left"></i>
      </div>
      <div class="merchant">
        <img :src="shopGoods.shopInfo.shopPic" :alt="shopGoods.shopInfo.shopName">
        <div class="merchant-info">
          <div class="journey">
            <p>
              <span class="time" v-html="`${shopGoods.shopInfo.deliveryTimeDecoded}分钟`"></span>
              <span class="distance" v-html="shopGoods.shopInfo.distance"></span>
            </p>
            <img src="@img/logo.png" v-if="shopGoods.shopInfo.deliveryType" />
          </div>
          <p class="affiche">公告:{{shopGoods.shopInfo.bulletin}}</p>
        </div>
        <div class="activitys" @touchstart.prevent="showFooterModal = true">
          <i class="iconfont icon-right icon"></i>
          <ul>
            <li v-for="(activity, i) in shopGoods.shopInfo.activityList" :key="i">
              <i :class="activity.icon"></i>
              <span v-html="activity.actDesc"></span>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <img src="@img/msite_back.svg" v-else/>
    <section v-if="shopGoods.categoryList">
      <ul class="menu">
        <li :class="{active: currentModel === 0}" @touchstart="currentModel = 0"><span>点菜</span></li>
        <li :class="{active: currentModel === 1}" @touchstart="currentModel = 1"><span>评价</span></li>
        <li :class="{active: currentModel === 2}" @touchstart="currentModel = 2"><span>商家</span></li>
      </ul>
      <Goods :list="shopGoods.categoryList" v-if="currentModel === 0"/>
      <Comments v-if="currentModel === 1"/>
      <Shop :footerData="shopGoods.shopInfo" v-if="currentModel === 2" @showfooter="showFooterModal = true"/>
    </section>
    <img src="@img/shop_back.svg" v-else/>
    <footer>
      <Cart :shopInfo="shopGoods.shopInfo" v-show="currentModel === 0"/>
      <Shade v-show="showFooterModal" @touchstart.prevent="showFooterModal = false" />
      <FooterModal :shopInfo="shopGoods.shopInfo" v-show="showFooterModal"/>
    </footer>
  </section>
  <section v-else>
    <img src="@img/error.png"/>
    <h3>暂无该商家信息...</h3>
  </section>
</template>

<script>
/*
  商家页面
  需求:
    2. 点击评论label显示对应的评论(在 Comments 组件里写)
*/
import { reactive, toRefs, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { Goods, Shop, Comments, Cart } from '@com/shopInfo'
export default {
  name: 'shopinfo',
  components: { Goods, Shop, Comments, Cart },
  setup () {
    const store = useStore()
    const { params } = useRoute()
    const { push } = useRouter()
    const state = reactive({
      shopGoods: store.state.shopGoods,
      currentModel: 0,
      showFooterModal: false
    })

    onBeforeMount(() => {
      if (!state.shopGoods.shopInfo) {
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
        padding-top: rem(5);
        font-size: $min-size;
        .journey{
          @extend .flex;
          justify-content: space-between;
          img{
            width: rem(50);
            height: rem(15);
            margin-top: 0;
          }
        }
        .affiche{
          @extend .nowrap;
          padding-top: rem(10);
        }
      }
    }
    .activitys{
      height: rem(20);
      margin-top: rem(8);
      padding-right: rem(10);
      overflow: hidden;
      position: relative;
      .icon{
        position: absolute;
        top: 50%;
        right: rem(10);
        transform: translateY(-50%);
        font-size: $min-size;
        color: $color4;
      }
      ul{
        li{
          display: flex;
          align-items: center;
          font-size: $min-size;
          margin: rem(2) 0 rem(5);
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
}
</style>
