<template>
  <Transition name="modal" v-if="shopInfo">
    <div class="shop-info">
      <ul class="activity-list">
        <li v-for="(activity, i) in shopInfo.activityList" :key="i">
          <i :class="activity.icon"></i>
          <span v-html="activity.actDesc"></span>
        </li>
      </ul>
      <div class="shipping">
        <p>配送</p>
        <p>起送 ¥{{shopInfo.minFee}}</p>
        <p>
          <span>配送时间: </span>
          <span v-html="shopInfo.shipping_time"></span>
        </p>
      </div>
      <div class="bulletin">
        <p>公告</p>
        <p>{{shopInfo.bulletin}}</p>
      </div>
    </div>
  </Transition>
</template>

<script>
/*
  从底部显示出来的模态框
*/
export default {
  name: 'FooterModal',
  props: {
    shopInfo: Object
  },
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.modal-enter-active,
.modal-leave-active{
  transition: transform .5s;
}

.modal-enter-from,
.modal-leave-to{
  transform: translateY(100%);
}

.modal-enter-to,
.modal-leave-from{
  transform: translateY(0);
}

.shop-info{
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2;
  background-color: $bg-color2;
  width: 100vw;
  padding: rem(20) rem(15) rem(35);
  border-top-right-radius: rem(10);
  border-top-left-radius: rem(10);
  .activity-list{
    margin-bottom: rem(20);
    li{
      font-size: $min-size;
      &:not(:nth-last-child(1)){
        margin-bottom: rem(6);
      }
    }
  }
  .shipping{
    margin-bottom: rem(15);
    p{
      font-size: $min-size;
      margin-bottom: rem(5);
      &:nth-child(1){
        font-size: $base-size;
        margin-bottom: rem(6);
      }
    }
  }
  .bulletin{
    p{
      font-size: $min-size;
      @extend .nowrap;
      &:nth-child(1){
        font-size: $base-size;
        margin-bottom: rem(10);
      }
    }
  }
}
</style>
