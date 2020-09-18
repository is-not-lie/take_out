<template>
  <section class="filter-container">
    <div class="filter-list" v-for="(filter, i) in filterList" :key="i">
      <p class="title" v-if="filter.title">{{filter.title}}</p>
      <Item
        :items="filter.list"
        :iptName="filter.title"
        :last="filterList.length - 1 === i"
        v-model="iptVal[i]"/>
    </div>
    <div class="btns">
      <span>清除筛选</span>
      <span>完成</span>
    </div>
  </section>
</template>

<script>
import { reactive, toRefs } from 'vue'
import Item from './Item'
export default {
  name: 'Filter',
  props: {
    filterList: Array
  },
  components: { Item },
  setup () {
    const state = reactive({
      iptVal: ['', [], '']
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-container{
  height: rem(400);
  overflow-y: auto;
  background-color: $bg-color2;
  .filter-list:not([class="btns"]){
    padding: rem(15) 0 rem(5) rem(15);
    @extend .border-bottom;
    .title{
      margin-bottom: rem(10);
      font-size: $min-size;
      color: $color2;
    }
  }
  .btns{
    display: flex;
    height: rem(50);
    span{
      flex: 1;
      text-align: center;
      line-height: rem(50);
      font-size: $base-size;
      background-color: $bg-color2;
      &:nth-last-child(1){
        background-color: $theme;
      }
    }
  }
}
</style>
