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
