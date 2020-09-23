<template>
  <section>
    <header>
      <router-link :to="{ name: 'seach' }">
        <Seach />
      </router-link>
    </header>
    <div class="category-labels">
      <ul class="category-list">
        <li class="icon" @touchstart="showAllCate">
          <i class="iconfont icon-bottom"></i>
        </li>
        <li :class="{active: cate.cateId === 0}" v-for="cate in categorys.categories" :key="cate.cateId">
          {{cate.name}}
        </li>
      </ul>
    </div>
    <Categories v-show="showCategories" :categories="categorys.categories"/>
    <div class="sort-menu-container">
      <SortMenu
        :scrollY="50"
        :sortList="categorys.sortVOList"
        :filterList="categorys.multifilterVOList"
      />
    </div>
    <section class="shops" v-if="shopsList">
      <Shop  v-for="shop in shopsList.list" :key="shop._id" :shop="shop"/>
    </section>
    <Loding v-else />
    <FooterLoding v-show="true"/>
    <Shade v-show="showCategories" @touchstart.self="showCategories = false"/>
  </section>
</template>

<script>
/*
  商家分类页面
  需求:
    1. 加载完成显示对应分类的商家列表
    2. 点击分类显示对应分类的商家列表
    3. 排序,筛选....
*/
import { reactive, toRefs, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { Categories } from '@com/category'
export default {
  name: 'category',
  components: { Categories },
  setup () {
    const store = useStore()
    const state = reactive({
      categorys: store.state.categorys,
      shopsList: store.state.shopsList,
      pageNum: 1,
      showCategories: false
    })
    // 显示隐藏的全部分类列表框
    const showAllCate = () => {
      state.showCategories = !state.showCategories
      document.documentElement.scrollTop = 40
    }

    onBeforeMount(() => {
      // 如果store里有数据就从store里拿,没有再发请求
      if (!state.categorys.categories) {
        store.dispatch('getCategorys', (categorys) => { state.categorys = categorys[0] })
      }
      if (!state.shopsList.list) {
        store.dispatch('getShopsList', {
          pageNum: state.pageNum,
          callback (shopsList) { state.shopsList = shopsList }
        })
      }
    })

    return { ...toRefs(state), showAllCate }
  }
}
</script>

<style lang="scss" scoped>
header{
  background-color: $bot-bg-color;
}
.category-labels{
  position: sticky;
  top: 0;
  left: 0;
  z-index: 3;
  background-color: $bg-color2;
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
      top: 0;
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
.sort-menu-container{
  position: sticky;
  top: rem(40);
  left: 0;
  z-index: 1;
  background-color: $bg-color2;
}
</style>
