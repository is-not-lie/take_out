<template>
  <ul>
    <li v-for="(menu,i) in list" :key="i" @touchstart.prevent="showChildren(i)">
      <span>{{menu.name}}</span>
      <i class="iconfont" v-if="menu.icon" :class="[menu.icon, {rotate: r && i === 0}]"></i>
    </li>
  </ul>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'Menu',
  props: {
    list: Array
  },
  setup (props, { emit }) {
    const r = ref(false)
    const showChildren = i => {
      const { list } = props
      const lastChildren = list.length - 1
      switch (i) {
        case 0:
          r.value = !r.value
          emit('show', 'sort')
          break
        case lastChildren:
          emit('show', 'filter')
          break
        default:
          emit('show', '')
          break
      }
    }
    return { showChildren, r }
  }
}
</script>

<style lang="scss" scoped>
ul{
  @extend .flex;
  @include border-y-1px;
  background-color: #fff;
  li{
    flex: 1;
    height: rem(40);
    @extend .flex;
    color: $color;
    i{
      font-size: $min-size;
      margin-left: rem(3);
      &.rotate{
        transform: rotateZ(180deg);
      }
    }
    &:nth-last-child(1){
      @include line{
        transform: scale(.5);
      };
    }
  }
}
</style>
