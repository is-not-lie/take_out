<template>
  <nav ref="nav" @touchstart="navClick">
    <ul class="sort-menu">
      <li v-for="(menu,i) in sortMenu" :key="i" @touchstart.prevent="showChildren(i)">
        <span>{{menu.name}}</span>
        <i class="iconfont" v-if="menu.icon" :class="[menu.icon, {rotate: r && i === 0}]"></i>
      </li>
    </ul>
    <ul class="sort-list" v-show="showStor">
      <li class="sort-item" v-for="sort in sortList" :key="sort.sortId">
        {{sort.name}}
      </li>
    </ul>
    <section class="filter-container" v-show="showFilter">
      <div class="filter-list" v-for="(filter, i) in filterList" :key="i">
        <p class="title" v-if="filter.title">{{filter.title}}</p>
        <Label
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
  </nav>
  <Shade @touchstart.self="showStor = showFilter = false" v-show="showStor || showFilter" />
</template>

<script>
/*
  排序导航组件
  需求: 排序功能(后台没搞好)
*/
import { reactive, toRefs } from 'vue'
import { sortMenu } from '@data'
import Label from './Label'
export default {
  name: 'SortMenu',
  props: {
    sortList: Array,
    filterList: Array
  },
  components: { Label },
  setup (props, { emit }) {
    const state = reactive({
      r: false,
      showStor: false,
      showFilter: false,
      iptVal: ['', [], '']
    })

    const navClick = () => {
      document.documentElement.scrollTop = 220
    }

    const showChildren = i => {
      const lastChildren = sortMenu.length - 1
      switch (i) {
        case 0:
          state.r = !state.r
          state.showStor = !state.showStor
          state.showFilter = false
          break
        case lastChildren:
          state.r = false
          state.showStor = false
          state.showFilter = !state.showFilter
          break
        default:
          state.r = false
          state.showStor = false
          state.showFilter = false
          break
      }
    }

    return { sortMenu, showChildren, navClick, ...toRefs(state) }
  }
}
</script>

<style lang="scss" scoped>
nav{
  position: relative;
  width: 100%;
  z-index: 10;
  .sort-menu{
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
  .sort-list{
    background-color: $bg-color2;
    li{
      padding-left: rem(15);
      height: rem(42);
      line-height: rem(42);
      @extend .border-bottom;
    }
  }
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
}
</style>
