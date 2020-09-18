<template>
  <section class="shop">
    <router-link :to="{ name: 'shopinfo', params: { id: shop._id } }">
      <img :src="shop.picUrl" :alt="shop.shopName">
      <div class="shop-info">
        <h3 class="shop-name">{{shop.shopName}}</h3>
        <div class="shop-score">
          <div class="star">
            <Star :score="shop.score" />
            <span>{{shop.score.toString().split('').join('.')}}</span>
            <span v-html="shop.monthSalesTip"></span>
          </div>
          <div class="delivery">
            <span v-html="shop.deliveryTimeTip"></span>
            <span v-html="shop.distance"></span>
          </div>
        </div>
        <div class="shop-price">
          <span v-html="shop.minPriceTip"></span>
          <span v-html="shop.shippingFeeTip"></span>
          <span v-html="shop.averagePriceTip"></span>
          <span v-if="shop.deliveryType" class="logo"></span>
        </div>
        <div class="shop-discounts">
          <p v-for="dis in shop.discounts2" :key="dis.activityId">
            <i :class="dis.icon"></i>
            <span v-html="dis.info"></span>
          </p>
        </div>
      </div>
    </router-link>
  </section>
</template>

<script>
export default {
  name: 'Shop',
  props: {
    shop: Object
  },
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.shop{
  a{
    padding: 0 rem(10);
    margin-top: rem(10);
    margin-bottom: rem(25);
    display: flex;
    img{
      width: rem(76);
      height: rem(57);
      margin-right: rem(8);
    }
    .shop-info{
      flex: 1;
      .shop-name{
        @extend .nowrap;
        width: 80%;
        font-size: $base-size;
      }
      .shop-score{
        @extend .flex;
        justify-content: space-between;
        font-size: $min-size;
        margin-top: rem(5);
      }
      .shop-price{
        @extend .clearfix;
        font-size: $min-size;
        margin-top: rem(5);
        .logo{
          float: right;
          width: rem(50);
          height: rem(15);
          background-image: url('~@img/logo.png');
          background-repeat: no-repeat;
          background-size: cover;
        }
      }
      .shop-discounts{
        position: relative;
        max-height: rem(50);
        overflow: hidden;
        p{
          margin-top: rem(8);
          font-size: $min-size;
          color: $color;
        }
      }
    }
  }
}
</style>
