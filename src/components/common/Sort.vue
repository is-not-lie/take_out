<template>
  <section class="sort-list">
    <ul>
      <li class="sort-item" v-for="sort in sortList" :key="sort.sortId">
        {{sort.name}}
      </li>
    </ul>
  </section>
</template>

<script>
/*
  排序选项组件
  需求: 点击对应选项对商品进行相应的排序
*/
export default {
  name: 'Sort',
  props: {
    sortList: Array
  },
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.sort-list{
  ul{
    background-color: $bg-color2;
    li{
      padding-left: rem(15);
      height: rem(42);
      line-height: rem(42);
      @extend .border-bottom;
    }
  }
}
</style>
