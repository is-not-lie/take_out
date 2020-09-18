<template>
  <section>
    <header>
      <Seach />
      <ul class="category-list" v-if="categorys">
        <li class="icon">
          <i class="iconfont icon-bottom"></i>
        </li>
        <li :class="{active: cate.cateId === 0}" v-for="cate in categorys.categories" :key="cate.cateId">
          {{cate.name}}
        </li>
      </ul>
    </header>
    <section class="shops">
      <nav>
        <Menu :list="homeMenu"  @show="showModal"/>
        <Sort v-show="showSort" :sortList="categorys.sortVOList"/>
        <Filter v-show="showFilter" :filterList="categorys.multifilterVOList"/>
      </nav>
    </section>
    <footer>
      <div class="loding"></div>
      <span>正在加载...</span>
    </footer>
  </section>
</template>

<script>
import { reactive, toRefs, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { homeMenu } from '@data'
export default {
  name: 'category',
  setup () {
    const store = useStore()
    const state = reactive({
      categorys: store.state.categorys,
      showSort: false,
      showFilter: false
    })

    const showModal = type => {
      switch (type) {
        case 'sort':
          state.showSort = !state.showSort
          state.showFilter = false
          break
        case 'filter':
          state.showFilter = !state.showFilter
          state.showSort = false
          break
        default:
          state.showFilter = false
          state.showSort = false
          break
      }
    }

    onBeforeMount(() => {
      store.dispatch('getCategorys', (categorys) => {
        state.categorys = categorys[0]
        console.log(categorys[0])
      })
    })

    return { homeMenu, showModal, ...toRefs(state) }
  }
}
</script>

<style lang="scss" scoped>
header{
  background-color: $bot-bg-color;
  .category-list{
    display: flex;
    width: 90%;
    margin-top: rem(-10);
    overflow-x: auto;
    li{
      height: rem(40);
      line-height: rem(40);
      margin: 0 rem(10);
      color: $color;
      white-space: nowrap;
      &.active{
        color: $subtopic;
        border-bottom: rem(2) solid $subtopic;
      }
    }
    .icon{
      position: absolute;
      top: rem(40);
      right: 0;
      width: 13%;
      margin: 0;
      background-image: linear-gradient(to left,transparent 0%, $bot-bg-color);
      @extend .flex;
      i{
        transform: scale(.6);
        font-weight: 900;
      }
    }
  }
}
footer{
  @extend .flex;
  height: rem(45);
  .loding{
    width: rem(20);
    height: rem(20);
    border-radius: rem(20);
    background-image: url('~@img/loding.png');
    background-repeat: no-repeat;
    background-size: cover;
    animation: rotate 1s linear infinite;
  }
  span{
    margin-left: rem(10);
    font-size: $min-size;
  }
}
@keyframes rotate {
  100%{
    transform: rotateZ(360deg);
  }
}
</style>
