<template>
  <section class="home">
    <header>
      <div class="header-bar">
        <i class="iconfont icon-position" @touchstart.prevent="push({name: 'position', params: { id: 1 }})"></i>
        <span class="site" @touchstart.prevent="push({name: 'position', params: { id: 1 }})">{{'广东省潮州市枫溪区'}}</span>
        <i class="iconfont icon-seach" @touchstart.prevent="push({name: 'seach'})"></i>
      </div>
      <ul class="category-list" v-if="categoryMenu">
        <li v-for="item in categoryMenu" :key="item._id">
          <router-link :to="{ name: 'category', params: { id: item.cateId } }">
            <img :src="`${BASE_URL}${item.img}`" :alt="item.name">
            <span>{{item.name}}</span>
          </router-link>
        </li>
      </ul>
      <img src="@img/msite_back.svg" v-else/>
      <h3 class="title">附近商家</h3>
    </header>
    <section class="home-main">
      <header class="menu">
        <SortMenu
          :scrollY="220"
          :sortList="categorys.sortVOList"
          :filterList="categorys.multifilterVOList"
        />
      </header>
      <template v-if="shopsList">
        <Shop v-for="shop in shopsList.list" :key="shop._id" :shop="shop"/>
      </template>
      <Loding v-else />
      <footer>
        <span v-show="!showLoding && !noData">上拉加载更多哦</span>
        <FooterLoding v-show="showLoding" />
        <span v-show="noData">已经没有更多的商家数据啦...</span>
      </footer>
    </section>
  </section>
</template>

<script>
/*
  首页
  需求:
    1. 加载后请求用户定位并显示
    2. 当顶部导航触碰到排序导航时隐藏定位信息,显示搜索框
    3. 点击顶部导航跳转定位页面 || 搜索页面
    5. 导航点击排序功能
    6. 点击分类导航跳转分类页面并展示对应分类商品
*/
import { reactive, toRefs, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { BASE_URL } from '@config'
import { update } from '@js'
export default {
  name: 'home',
  setup () {
    const store = useStore()
    const { push } = useRouter()
    const state = reactive({
      shopsList: store.state.shopsList,
      categorys: store.state.categorys,
      categoryMenu: store.state.categoryMenu,
      showLoding: false,
      pageNum: 1, // 这个是分页标识,用户上拉加载更多时要自增
      noData: false
    })
    const updateState = update(() => {
      const { pageSize, pageNum, total } = state.shopsList
      if (Math.round(total / pageSize) === pageNum) {
        state.noData = true
      } else {
        state.pageNum++
        state.showLoding = true
        setTimeout(() => {
          store.dispatch('getShopsList', {
            pageNum: state.pageNum,
            callback (shopsList) {
              state.shopsList = shopsList
              state.showLoding = false
            }
          })
        }, 400)
      }
    })

    onBeforeMount(() => {
      // 如果store里有数据就从store里拿,没有再发请求
      if (!state.categorys.categories) {
        store.dispatch('getCategorys', (categorys) => { state.categorys = categorys[0] })
      }
      if (!state.categoryMenu.length) {
        store.dispatch('getCategoryMenu', (categoryMenu) => { state.categoryMenu = categoryMenu })
      }
      if (!state.shopsList.list) {
        store.dispatch('getShopsList', {
          pageNum: state.pageNum,
          callback (shopsList) { state.shopsList = shopsList }
        })
      }
    })

    return { ...toRefs(state), BASE_URL, push, ...updateState }
  }
}
</script>

<style lang="scss" scoped>
.home{
  header{
    .header-bar{
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: rem(50);
      background-color: $top-bg-color;
      color: #fafafad7;
      @extend .flex;
      i{
        flex: 1;
        text-align: center;
        font-size: $base-size;
      }
      .site{
        flex: 3;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: $base-size;
      }
    }
    .category-list{
      @extend .flex;
      flex-wrap: wrap;
      margin-top: rem(50);
      li{
        width: 20%;
        a{
          @extend .flex;
          flex-direction: column;
          font-size: $min-size;
          img{
            width: rem(44);
            height: rem(44);
            margin-top: rem(20);
            margin-bottom: rem(10);
          }
        }
      }
    }
    .title{
      @extend .flex;
      margin-top: rem(20);
      margin-bottom: rem(5);
      &::before{
        @extend .min-line;
        transform-origin: 100% 50%;
      }
      &::after{
        @extend .min-line;
        transform-origin: 0 50%;
      }
    }
  }
  .home-main{
    margin-bottom: rem(50);
    .menu{
      position: sticky;
      top: rem(50);
      z-index: 1;
    }
    footer{
      @extend .flex;
      height: rem(45);
      font-size: $base-size;
    }
  }
}
</style>
