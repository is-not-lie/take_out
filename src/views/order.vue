<template>
  <div class="order" v-if="user.token && orderList">
    <section class="order-wrapper" v-for="order in orderList" :key="order.orderId">
      <header class="order-header" @touchstart.prevent="push({ name: 'shopinfo', params: { id: order.shopId } })">
        <img :src="order.img" :alt="order.shopName">
        <div class="shop-name">
          <span>{{order.shopName}}</span>
          <i class="iconfont icon-right"></i>
        </div>
      </header>
      <section class="order-info">
        <p v-for="(product,i) in order.productList" :key="i">
          <span>{{product.productName}}</span>
          <span class="count">{{product.productCount}}</span>
        </p>
        <p>
          <span class="time">{{order.orderTime}}</span>
          <span class="price">实付¥{{order.totalPrice}}</span>
        </p>
      </section>
      <footer class="order-footer">
        <span class="status">{{order.status}}</span>
        <span class="again" @touchstart.prevent="push({ name: 'shopinfo', params: { id: order.shopId } })">再来一单</span>
        <span class="del" @touchstart.prevent="delOrder(order.orderId)">删除</span>
      </footer>
    </section>
  </div>
  <div class="to-login" v-else>
    <img src="@img/person.png" />
    <router-link :to="{ name: 'login' }">
      前往登录
    </router-link>
    <p>当前尚未登录,请登录后查看订单</p>
  </div>
  <Alert v-show="showAlert" @handleclick="alertClick">
    <p class="alert-text">确定要删除该订单吗?</p>
  </Alert>
</template>

<script>
/*
  用户订单页面
  需求:
    2. 点击再来一单时跳转对应商家页面并勾选对应商品,若对应商品已停售则提醒用户
*/
import { reactive, toRefs, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'order',
  setup () {
    const store = useStore()
    const { push } = useRouter()
    const state = reactive({
      user: store.state.user,
      orderList: store.state.orderList,
      showAlert: false,
      orderId: null
    })
    // 删除订单
    const del = () => {
      const { orderId, user } = state
      if (orderId) {
        store.dispatch('delOrder', {
          orderId,
          userId: user._id,
          callback (orderList) {
            state.orderList = orderList
            state.orderId = null
          }
        })
      }
    }
    // 显示弹框提示
    const delOrder = (orderId) => {
      state.showAlert = true
      state.orderId = orderId
    }
    // 弹框确认/取消
    const alertClick = type => {
      switch (type) {
        case 'close':
          state.showAlert = false
          break
        case 'ok':
          state.showAlert = false
          del()
          break
        default:
          state.showAlert = false
          break
      }
    }

    onBeforeMount(() => {
      const { user } = state
      if (user._id && !state.orderList.length) {
        store.dispatch('getOrder', { userId: user._id, callback (list) { state.orderList = list } })
      }
    })

    return { push, delOrder, ...toRefs(state), alertClick }
  }
}
</script>

<style lang="scss" scoped>
.order{
  min-height: 100vh;
  margin-bottom: rem(50);
  background-color: $bg-color3;
  .order-wrapper{
    padding-left: rem(15);
    background-color: $bg-color2;
    @include border-y-1px;
    &:not(:nth-child(1)){
      margin-top: rem(10);
    }
    .order-header{
      padding: rem(10) 0;
      display: flex;
      @extend .border-bottom;
      img{
        width: rem(35);
        height: rem(35);
        border-radius: rem(35);
      }
      .shop-name{
        flex: 1;
        @extend .flex;
        justify-content: space-between;
        padding: 0 rem(10);
      }
    }
    .order-info{
      padding: rem(10) 0;
      @extend .border-bottom;
      p{
        @extend .flex;
        justify-content: space-between;
        padding-right: rem(10);
        padding-top: rem(6);
        padding-bottom: rem(6);
        .count,
        .price{
          color: $color3;
        }
        .time{
          font-size: $min-size;
          color: $color2;
        }
      }
    }
    .order-footer{
      padding: rem(10) 0;
      @extend .clearfix;
      line-height: rem(25);
      .status{
        color: $color2;
      }
      .again,
      .del{
        float: right;
        margin-right: rem(10);
        padding: 0 rem(10);
        border-radius: rem(3);
      }
      .again{
        background-color: $theme;
        border: rem(1) solid $theme;
      }
      .del{
        border: rem(1) solid $border-color;
      }
    }
  }
}
.to-login{
  @extend .flex;
  flex-direction: column;
  a{
    width: rem(120);
    height: rem(40);
    text-align: center;
    line-height: rem(40);
    background-color: $theme;
    color: $color2;
    font-weight: 600;
    margin: rem(20) 0;
    border-radius: rem(5);
  }
}
.alert-text{
  padding: rem(25);
}
</style>
