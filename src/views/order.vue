<template>
  <div class="order" v-if="user.token">
    <section class="order-wrapper" v-for="order in 5" :key="order">
      <header class="order-header">
        <img src="../assets/images/error.png" alt="">
        <div class="shop-name">
          <span>{{'华莱士·全鸡汉堡（枫溪店）'}}</span>
          <i class="iconfont icon-right"></i>
        </div>
      </header>
      <section class="order-info">
        <p><span>{{'板烧鸡腿堡'}}</span><span class="count">{{'x1'}}</span></p>
        <p><span>{{'荔荔手扒鸡单人套餐'}}</span><span class="count">{{'x1'}}</span></p>
        <p><span>{{'香酥鸡腿W'}}</span><span class="count">{{'x1'}}</span></p>
        <p><span class="time">{{'2020-08-02 12:11'}}</span><span class="price">实付¥{{36.84}}</span></p>
      </section>
      <footer class="order-footer">
        <span class="status">{{'已完成'}}</span>
        <span class="again">再来一单</span>
        <span class="del">删除</span>
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
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'order',
  setup () {
    const store = useStore()
    const state = reactive({
      user: store.state.user
    })
    return toRefs(state)
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
        border: 1px solid $theme;
      }
      .del{
        border: 1px solid $border-color;
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
</style>
