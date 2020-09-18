<template>
  <section class="home-main">
    <header class="menu">
      <Menu :list="homeMenu"/>
    </header>
    <section v-if="shopsList">
      <Shop  v-for="shop in shopsList.list" :key="shop._id" :shop="shop"/>
    </section>
    <Loding v-else />
    <footer></footer>
  </section>
</template>

<script>
import { onBeforeMount, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { homeMenu } from '@data'
export default {
  name: 'HomeMain',
  setup () {
    const store = useStore()
    const state = reactive({
      shopsList: store.state.shopsList,
      pageNum: 1
    })

    onBeforeMount(() => {
      store.dispatch('getShopsList', {
        pageNum: state.pageNum,
        callback (shopsList) {
          state.shopsList = shopsList
        }
      })
    })

    return { homeMenu, ...toRefs(state) }
  }
}
</script>

<style lang="scss" scoped>
.home-main{
  margin-bottom: rem(50);
}
.menu{
  position: sticky;
  top: rem(50);
  z-index: 1;
}
</style>
