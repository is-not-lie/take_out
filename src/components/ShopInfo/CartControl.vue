<template>
  <div class="cart-control-container">
    <Transition name="sub" v-show="food.count">
      <span class="count-sub" @touchstart.prevent="updateCount(false)"></span>
    </Transition>
    <span class="count" v-show="food.count">{{food.count}}</span>
    <span class="count-add" @touchstart.prevent="updateCount(true)"></span>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'CartControl',
  props: {
    food: Object
  },
  setup (props) {
    const { dispatch } = useStore()
    const updateCount = isAdd => {
      const { food } = props
      if (isAdd) {
        if (food.count) food.count++
        else food.count = 1
      } else {
        if (food.count) food.count--
      }
      dispatch('updateCart', food)
    }
    return { updateCount }
  }
}
</script>

<style lang="scss" scoped>
.sub-enter-active{
  transition: transform .6s;
}
.sub-leave-active{
  transition: transform .3s;
}

.sub-enter-from,
.sub-leave-to{
  transform: translateX(100%);
}

.sub-enter-to,
.sub-leave-from{
  transform: translateX(0);
}

.cart-control-container{
  @extend .flex;
  .count-sub,
  .count-add{
    width: rem(25);
    height: rem(25);
    border-radius: rem(25);
    background-repeat: no-repeat;
    background-size: cover;
  }
  .count-sub{
    background-image: url('~@img/btn-sub.png');
  }
  .count-add{
    background-image: url('~@img/btn-add.png');
  }
  .count{
    margin: 0 rem(10);
    font-size: $base-size;
    color: $color;
  }
}
</style>
