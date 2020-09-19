<template>
  <section v-if="shopInfo" class="shop-info-wrap">
    <header class="site">
      <p>
        <span>
          <i class="iconfont icon-position"></i>
          <span v-html="shopInfo.shopAddress"></span>
        </span>
        <button><i class="iconfont icon-phone1"></i></button>
      </p>
      <p v-show="shopInfo.poiQualificationInfo?.show">
        <a :href="shopInfo.poiQualificationInfo?.url">
          <i class="iconfont icon-safety"></i>
          {{shopInfo.poiQualificationInfo?.content}}
        </a>
        <i class="iconfont icon-right"></i>
      </p>
    </header>
    <section class="server">
      <p>
        <span>
          <i class="iconfont icon-order1"></i>
          配送服务：
        </span>
        <img src="@img/logo.png" />
        <span>提供高品质配送服务</span>
      </p>
      <p class="time">
        <span>
          <i class="iconfont icon-time"></i>
          配送时间：
        </span>
        <span v-for="(serTime, i) in shopInfo.serTime" :key="i" v-html="serTime"></span>
      </p>
    </section>
    <footer class="discounts">
      <p class="tip">
        <i class="iconfont icon-notice"></i>
        <span>{{shopInfo.tip}}</span>
        <i class="iconfont icon-right"></i>
      </p>
      <div class="shop-server">
        <span>
          <i class="iconfont icon-succeed"></i>
          商家服务
        </span>
        <div>
          <p v-if="shopInfo.isBrand">
            <i class="brand"></i>
            <span>该用户为品牌用户</span>
          </p>
          <p v-if="shopInfo.onlinePay">
            <i class="pay"></i>
            <span>该用户支持在线支付</span>
            <i v-if="shopInfo.invoiceSupport" class="ticket"></i>
          </p>
        </div>
      </div>
      <div class="activity">
        <p v-for="(activity, i) in shopInfo.activityList" :key="i">
          <i :class="activity.icon"></i>
          <span v-html="activity.desc"></span>
        </p>
      </div>
    </footer>
  </section>
  <Loding v-else/>
</template>

<script>
/*
  商家详情组件
  需求:
    1. 点击电话图标拨打商家电话
*/
import { reactive, toRefs, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default {
  setup () {
    const store = useStore()
    const route = useRoute()
    const state = reactive({
      shopInfo: store.state.shopInfo
    })

    onBeforeMount(() => {
      if (store.state.shopInfo) {
        const shopId = route.params.id
        store.dispatch('getShopInfo', {
          shopId,
          callback (shopInfo) { state.shopInfo = shopInfo }
        })
      }
    })

    return toRefs(state)
  }
}
</script>

<style lang="scss" scoped>
.shop-info-wrap{
  padding: 0 rem(15);
  .site{
    p{
      margin: rem(18) 0;
      @extend .flex;
      justify-content: space-between;
      span{
        width: 90%;
        @extend .nowrap;
        @extend .border-right;
      }
      button{
        width: rem(50);
        height: rem(40);
        line-height: rem(40);
        text-align: center;
        background: none;
        border: none;
        i{
          color: $color;
          font-size: rem(20);
          margin: 0;
        }
      }
      i{
        font-size: $base-size;
        color: $color4;
        margin-right: rem(5);
      }
    }
  }
  .server{
    @extend .border-bottom;
    p{
      margin: rem(18) 0;
      @extend .flex;
      justify-content: flex-start;
      i{
        margin-right: rem(5);
        color: $color4;
        font-size: $base-size;
      }
      img{
        width: rem(50);
        height: rem(15);
        margin: 0 rem(10) 0 rem(5);
      }
    }
  }
  .discounts{
    .tip{
      @extend .flex;
      justify-content: flex-start;
      margin: rem(18) 0;
      span{
        flex: 1;
        @extend .nowrap;
      }
      i{
        font-size: $base-size;
        color: $color4;
        margin-right: rem(5);
      }
    }
    .shop-server{
      display: flex;
      margin: rem(18) 0;
      span{
        i{
          font-size: $base-size;
          color: $color4;
          margin-right: rem(5);
        }
      }
      div{
        padding-left: rem(15);
        .brand,
        .pay,
        .ticket{
          color: skyblue;
          border-color: skyblue;
          transform: scale(.8);
          &::before{
            margin: 0;
          }
        }
        .ticket{
          margin-left: rem(15);
        }
      }
    }
    .activity{
      margin: rem(18) 0;
      p{
        @extend .flex;
        justify-content: flex-start;
        margin-bottom: rem(5);
        span{
          line-height: rem(20);
        }
      }
    }
  }
}
</style>
