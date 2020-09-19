<template>
  <section>
    <header>
      <router-link :to="{ name: 'seach' }">
        <Seach />
      </router-link>
    </header>
    <div class="category-labels" v-if="categorys">
      <ul class="category-list">
        <li class="icon" @touchstart="showCategories = !showCategories">
          <i class="iconfont icon-bottom"></i>
        </li>
        <li :class="{active: cate.cateId === 0}" v-for="cate in categorys.categories" :key="cate.cateId">
          {{cate.name}}
        </li>
      </ul>
      <Categories v-show="showCategories" :categories="categorys.categories"/>
      <SortMenu :sortList="categorys.sortVOList" :filterList="categorys.multifilterVOList"/>
    </div>
    <img src="@img/shop_back.svg" v-else/>
    <section class="shops" v-if="shopsList">
      <Shop  v-for="shop in shopsList.list" :key="shop._id" :shop="shop"/>
    </section>
    <Loding v-else />
    <FooterLoding v-show="true"/>
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

    return { ...toRefs(state) }
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
  z-index: 1;
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

</style>
