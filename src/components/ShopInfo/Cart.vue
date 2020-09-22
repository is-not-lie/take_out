<template>
  <footer v-if="shopInfo">
    <div class="cart" :class="{active: count}">
      <i class="iconfont icon-cart"></i>
      <span v-show="count">{{count}}</span>
    </div>
    <div class="price">
      <span v-show="count" class="total-price"><span>¥</span>{{totalPrice}}<del>¥{{originTotalPrice}}</del></span>
      <span :class="{min: !!count}">另需配送费¥{{shopInfo.deliveryFee}}</span>
    </div>
    <div class="min-price"
    :class="[{minFee: priceSpread > 0 && priceSpread !== shopInfo.minFee}, {gopay: totalPrice >= shopInfo.minFee}]"
    @touchstart.prevent="goPay(shopInfo.minFee)">
      <span v-show="!count">¥{{shopInfo.minFee}}起送</span>
      <span v-show="priceSpread > 0 && priceSpread !== shopInfo.minFee">还差¥{{priceSpread}}起送</span>
      <span v-show="totalPrice >= shopInfo.minFee">去结算</span>
    </div>
  </footer>
</template>

<script>
import { reactive, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'Cart',
  props: { shopInfo: Object },
  setup (props) {
    const store = useStore()
    const { push } = useRouter()
    const state = reactive({
      cart: store.state.userCart
    })
    // 总价格
    const totalPrice = computed(() => {
      let price = 0
      const { cart } = state
      cart.forEach(food => {
        price += food.count * food.currentPrice
      })
      return Math.floor(price * 100) / 100
    })
    // 折扣前总价
    const originTotalPrice = computed(() => {
      let originPrice = 0
      const { cart } = state
      cart.forEach(food => {
        originPrice += food.originPrice * food.count
      })
      return Math.floor(originPrice * 100) / 100
    })
    // 计算还差多少金额达到起送价
    const priceSpread = computed(() => {
      const { minFee } = props.shopInfo
      const price = minFee - totalPrice.value
      return Math.floor(price * 100) / 100
    })
    // 总数量
    const count = computed(() => {
      let count = 0
      const { cart } = state
      cart.forEach(food => {
        count += food.count
      })
      return count
    })
    // 点击跳转结算页逻辑
    const goPay = (minFee) => {
      if (totalPrice.value >= minFee) {
        push({ name: 'pay' })
      }
    }
    return { ...toRefs(state), totalPrice, originTotalPrice, priceSpread, count, goPay }
  }
}
</script>

<style lang="scss" scoped>
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
    transition: background-color .3s;
    &.active{
      background-color: $subtopic;
      i{
        color: $color3;
      }
    }
    i{
      font-size: $max-size;
      color: $color4;
      transition: color .3s;
    }
    span{
      position: absolute;
      top: 0;
      right: 0;
      width: rem(15);
      height: rem(15);
      border-radius: rem(15);
      line-height: rem(15);
      text-align: center;
      background-color: $color5;
      color: #fff;
      font-size: $min-size;
    }
  }
  .price{
    @extend .flex;
    align-items: flex-start;
    flex-direction: column;
    .min{
      font-size: $min-size;
      margin-top: rem(5);
    }
    .total-price{
      font-size: $ls-size;
      color: $color6;
      span{
        font-size: $base-size;
        margin-right: rem(5);
      }
      del{
        font-size: $min-size;
        margin-left: rem(5);
        color: $color2;
      }
    }
  }
  .min-price{
    height: 100%;
    line-height: rem(50);
    padding: 0 rem(18);
    font-size: $base-size;
    font-weight: 600;
    &.minFee{
      background-color: #2e2d2d;
    }
    &.gopay{
      padding: 0 rem(30);
      font-weight: 400;
      color: $color3;
      background: #f8c74e;
      background-image: linear-gradient(-135deg, #FFBD27 0%, #FFD161 100%);
    }
  }
}
</style>
